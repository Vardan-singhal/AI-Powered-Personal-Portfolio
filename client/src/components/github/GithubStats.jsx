export default function GithubStats({ profile }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-yellow-500/15
        bg-neutral-950
        p-6
        flex
        flex-col
        md:flex-row
        items-center
        gap-6
        shadow-lg
      "
    >
      {/* Avatar */}
      <img
        src={profile.avatar}
        alt={profile.name || profile.login}
        className="
          w-20
          h-20
          rounded-full
          border-2
          border-yellow-500/30
        "
      />

      {/* Profile Info */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-bold text-yellow-300">
          {profile.name || profile.login}
        </h3>

        <p className="text-sm text-zinc-400 mt-1">
          {profile.bio || 'GitHub Developer'}
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-5">
          <Stat
            label="Repositories"
            value={profile.public_repos}
          />

          <Stat
            label="Followers"
            value={profile.followers}
          />

          <Stat
            label="Following"
            value={profile.following}
          />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div
      className="
        min-w-[110px]
        rounded-xl
        border
        border-yellow-500/10
        bg-black
        px-4
        py-3
        text-center
      "
    >
      <div className="text-xl font-bold text-yellow-300">
        {value}
      </div>

      <div className="text-xs uppercase tracking-wide text-zinc-500 mt-1">
        {label}
      </div>
    </div>
  );
}