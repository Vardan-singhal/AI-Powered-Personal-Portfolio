import { FiStar, FiGitBranch } from 'react-icons/fi';

export default function RepoCard({ repo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className="
        block
        rounded-2xl
        border
        border-yellow-500/15
        bg-neutral-950
        p-5
        transition-all
        duration-300
        hover:border-yellow-500/35
        hover:bg-neutral-900
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Repo Name */}
      <h4 className="font-semibold text-yellow-300 text-lg">
        {repo.name}
      </h4>

      {/* Description */}
      <p className="text-sm text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
        {repo.description || 'No description available.'}
      </p>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 text-xs mt-4">
        <span className="flex items-center gap-1 text-zinc-400">
          <FiStar className="text-yellow-400" />
          {repo.stars}
        </span>

        <span className="flex items-center gap-1 text-zinc-400">
          <FiGitBranch className="text-yellow-400" />
          {repo.forks}
        </span>

        {repo.language && (
          <span
            className="
              px-2
              py-1
              rounded-full
              bg-yellow-500/10
              border
              border-yellow-500/20
              text-yellow-300
            "
          >
            {repo.language}
          </span>
        )}
      </div>
    </a>
  );
}