import Modal from '../common/Modal';
import AIProjectExplainer from './AIProjectExplainer';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <Modal
      open={!!project}
      onClose={onClose}
      title={project.title}
    >
      {/* Description */}
      <p className="text-zinc-300 leading-relaxed">
        {project.longDescription || project.description}
      </p>

      {/* Links */}
      <div className="flex flex-wrap gap-3 mt-6">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="
              px-5
              py-2.5
              rounded-xl
              border
              border-yellow-500/20
              text-yellow-300
              hover:bg-yellow-500/10
              transition
            "
          >
            GitHub
          </a>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="
              px-5
              py-2.5
              rounded-xl
              bg-brand-600
              text-black
              font-semibold
              hover:scale-105
              transition
            "
          >
            Live Demo
          </a>
        )}
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mt-6">
        {project.technologies?.map((tech) => (
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

      {/* AI Analysis */}
      <AIProjectExplainer projectId={project._id} />
    </Modal>
  );
}