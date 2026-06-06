import Modal from '../common/Modal';
import AIProjectExplainer from './AIProjectExplainer';
export default function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <Modal open={!!project} onClose={onClose} title={project.title}>
      <p className="text-slate-300">{project.longDescription || project.description}</p>
      <div className="flex gap-2 mt-4">
        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost">GitHub</a>}
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">Live Demo</a>}
      </div>
      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.technologies?.map((t) => <span key={t} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10">{t}</span>)}
      </div>
      <AIProjectExplainer projectId={project._id} />
    </Modal>
  );
}
