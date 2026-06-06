import { motion } from 'framer-motion';
export default function ProjectCard({ project, onOpen }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="card cursor-pointer" onClick={() => onOpen(project)}>
      {project.images?.[0] && <img src={project.images[0].url} alt={project.title} className="w-full h-44 object-cover rounded-lg mb-4" />}
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="text-sm text-slate-400 mt-2 line-clamp-3">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.technologies?.slice(0, 4).map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded bg-brand-500/15 text-brand-500 border border-brand-500/20">{t}</span>
        ))}
      </div>
    </motion.div>
  );
}
