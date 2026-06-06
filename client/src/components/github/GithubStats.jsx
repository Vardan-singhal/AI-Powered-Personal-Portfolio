export default function GithubStats({ profile }) {
  return (
    <div className="card flex items-center gap-6">
      <img src={profile.avatar} alt="" className="w-20 h-20 rounded-full" />
      <div>
        <h3 className="text-xl font-bold">{profile.name || profile.login}</h3>
        <p className="text-sm text-slate-400">{profile.bio}</p>
        <div className="flex gap-6 mt-3 text-sm">
          <Stat label="Repos" v={profile.public_repos} />
          <Stat label="Followers" v={profile.followers} />
          <Stat label="Following" v={profile.following} />
        </div>
      </div>
    </div>
  );
}
const Stat = ({ label, v }) => <div><div className="font-bold text-lg">{v}</div><div className="text-xs text-slate-400">{label}</div></div>;
