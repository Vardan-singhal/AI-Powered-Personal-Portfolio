export default function ProjectCard({ project }) {
  return (
    <div
      className="
        rounded-xl
        border
        border-yellow-500/15
        bg-neutral-950
        p-4
        transition-all
        duration-300
        hover:border-yellow-500/40
        hover:shadow-lg
      "
    >
      <h3 className="font-semibold text-yellow-300 text-lg">
        {project.title}
      </h3>

      <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
        {project.description}
      </p>

      {project.technologies?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="
                text-xs
                px-3
                py-1
                rounded-full
                bg-yellow-500/10
                border
                border-yellow-500/20
                text-yellow-300
              "
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-5">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-4
              py-2
              rounded-lg
              bg-brand-600
              text-black
              font-medium
              hover:scale-105
              transition
            "
          >
            Live Demo
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-4
              py-2
              rounded-lg
              border
              border-yellow-500/25
              text-yellow-300
              hover:bg-yellow-500/10
              hover:border-yellow-500/50
              transition
            "
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}