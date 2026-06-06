import useGithub from '../hooks/useGithub';
import GithubStats from '../components/github/GithubStats';
import LanguageChart from '../components/github/LanguageChart';
import RepoCard from '../components/github/RepoCard';
import ContributionCalendar from '../components/github/ContributionCalendar';
import Loader from '../components/common/Loader';

export default function Github() {
  const { data, loading, error } = useGithub();
  if (loading) return <Loader />;
  if (error) return <div className="max-w-4xl mx-auto px-6 py-16"><p className="text-rose-400">Error loading GitHub: {error}</p></div>;
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-6">
      <h1 className="text-4xl font-bold">GitHub Dashboard</h1>
      <GithubStats profile={data.profile} />
      <div className="grid md:grid-cols-2 gap-6">
        <LanguageChart languages={data.languages} />
        <div className="card">
          <h3 className="font-semibold mb-3">Top Repositories</h3>
          <div className="space-y-3">
            {data.topRepos.map((r) => <RepoCard key={r.name} repo={r} />)}
          </div>
        </div>
      </div>
      <ContributionCalendar contributionData={data.contributions} />
    </div>
  );
}
