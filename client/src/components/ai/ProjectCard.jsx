export default function ProjectCard({ project }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <h3 className="font-semibold text-white">
        {project.title}
      </h3>

      <p className="mt-2 text-sm text-slate-300">
        {project.description}
      </p>

      {project.technologies?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-full bg-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Live Demo
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg border border-white/20"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}