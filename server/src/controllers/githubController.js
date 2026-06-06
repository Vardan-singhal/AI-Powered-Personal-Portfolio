const asyncHandler = require('express-async-handler');

async function gh(path) {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    throw new Error(
      'GitHub username is not configured. Please set GITHUB_USERNAME in the server .env file.'
    );
  }

  const headers = {
    'User-Agent': 'ai-dev-hub',
    Accept: 'application/vnd.github+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const r = await fetch(
    `https://api.github.com${path.replace(':user', username)}`,
    { headers }
  );

  if (!r.ok) {
    let message = `GitHub ${r.status}`;

    try {
      const body = await r.json();

      if (body?.message) {
        message = `GitHub ${r.status}: ${body.message}`;
      }
    } catch (_err) {
      // ignore parse failures
    }

    throw new Error(message);
  }

  return r.json();
}

async function ghGraphQL(query, variables = {}) {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    throw new Error(
      'GitHub username is not configured. Please set GITHUB_USERNAME in the server .env file.'
    );
  }

  if (!process.env.GITHUB_TOKEN) {
    throw new Error(
      'GitHub token is required for GraphQL contributions data.'
    );
  }

  const headers = {
    'User-Agent': 'ai-dev-hub',
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };

  const r = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await r.json();

  if (!r.ok || json.errors) {
    let message = `GitHub GraphQL ${r.status}`;

    if (json.errors?.length) {
      message = json.errors.map((err) => err.message).join('; ');
    }

    throw new Error(message);
  }

  return json.data;
}

async function getContributionYear(year) {
  const data = await ghGraphQL(
    `
    query contributions(
      $login: String!,
      $from: DateTime!,
      $to: DateTime!
    ) {
      user(login: $login) {
        contributionsCollection(
          from: $from,
          to: $to
        ) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
                weekday
              }
            }
          }
        }
      }
    }
    `,
    {
      login: process.env.GITHUB_USERNAME,
      from: `${year}-01-01T00:00:00Z`,
      to: `${year}-12-31T23:59:59Z`,
    }
  );

  return data.user.contributionsCollection.contributionCalendar;
}

function parseContributionCalendarFromHtml(html) {
  const dayRegex = /<rect([^>]+)>/g;

  const days = [];
  let match;

  while ((match = dayRegex.exec(html)) !== null) {
    const attrs = match[1];

    const dateMatch = attrs.match(/data-date="([^"]+)"/);
    const countMatch = attrs.match(/data-count="([^"]+)"/);
    const fillMatch = attrs.match(/fill="([^"]+)"/);

    if (dateMatch && countMatch) {
      const date = dateMatch[1];
      const contributionCount = Number(countMatch[1]);
      const color = fillMatch ? fillMatch[1] : '#ebedf0';

      days.push({
        date,
        contributionCount,
        color,
        weekday: new Date(date).getDay(),
      });
    }
  }

  if (!days.length) return null;

  const weeks = [];

  days.forEach((day, index) => {
    const weekIndex = Math.floor(index / 7);

    if (!weeks[weekIndex]) {
      weeks[weekIndex] = {
        contributionDays: [],
      };
    }

    weeks[weekIndex].contributionDays.push(day);
  });

  const totalContributions = days.reduce(
    (sum, day) => sum + day.contributionCount,
    0
  );

  return {
    totalContributions,
    weeks,
  };
}

async function fetchContributionCalendarFallback() {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    throw new Error(
      'GitHub username is not configured. Please set GITHUB_USERNAME in the server .env file.'
    );
  }

  const r = await fetch(`https://github.com/${username}`, {
    headers: {
      'User-Agent': 'ai-dev-hub',
    },
  });

  if (!r.ok) {
    throw new Error(`GitHub page fetch failed: ${r.status}`);
  }

  const html = await r.text();

  return parseContributionCalendarFromHtml(html);
}

exports.stats = asyncHandler(async (_req, res) => {
  const user = await gh('/users/:user');

  const repos = await gh(
    '/users/:user/repos?per_page=100&sort=updated'
  );

  const langCount = {};

  repos.forEach((repo) => {
    if (repo.language) {
      langCount[repo.language] =
        (langCount[repo.language] || 0) + 1;
    }
  });

  let contributions = null;

  // Multi-year contribution support
  if (process.env.GITHUB_TOKEN) {
    try {
      const currentYear = new Date().getFullYear();

      contributions = {};

      for (
        let year = currentYear;
        year >= currentYear - 4;
        year--
      ) {
        try {
          contributions[year] =
            await getContributionYear(year);
        } catch (error) {
          console.warn(
            `Failed to fetch contributions for ${year}:`,
            error.message
          );
        }
      }

      if (Object.keys(contributions).length === 0) {
        contributions = null;
      }
    } catch (error) {
      console.warn(
        'GitHub contributions query failed:',
        error.message
      );
    }
  }

  // Fallback if token is unavailable
  if (!contributions) {
    try {
      const fallbackCalendar =
        await fetchContributionCalendarFallback();

      if (fallbackCalendar) {
        const currentYear = new Date().getFullYear();

        contributions = {
          [currentYear]: fallbackCalendar,
        };
        console.log(`✓ GitHub contributions loaded via fallback for ${currentYear}`);
      }
    } catch (error) {
      console.warn(
        'GitHub contribution fallback failed:',
        error.message
      );
    }
  }


  res.json({
    profile: {
      login: user.login,
      name: user.name,
      avatar: user.avatar_url,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
      html_url: user.html_url,
    },

    languages: langCount,

    topRepos: repos
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count
      )
      .slice(0, 6)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url,
        updated: repo.updated_at,
      })),

    contributions,
  });
});

exports.repos = asyncHandler(async (_req, res) => {
  const repos = await gh(
    '/users/:user/repos?per_page=100&sort=updated'
  );

  res.json(repos);
});