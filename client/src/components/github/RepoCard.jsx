import { FiStar, FiGitBranch } from 'react-icons/fi';
export default function RepoCard({ repo }) {
  return (
    <a href={repo.url} target="_blank" rel="noreferrer" className="card block hover:bg-white/10 transition">
      <h4 className="font-semibold">{repo.name}</h4>
      <p className="text-sm text-slate-400 mt-1 line-clamp-2">{repo.description}</p>
      <div className="flex gap-4 text-xs text-slate-400 mt-3">
        <span className="flex items-center gap-1"><FiStar /> {repo.stars}</span>
        <span className="flex items-center gap-1"><FiGitBranch /> {repo.forks}</span>
        {repo.language && <span>{repo.language}</span>}
      </div>
    </a>
  );
}
