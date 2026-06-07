import { motion } from 'framer-motion';

export default function ProjectCard({ project, onOpen }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.2,
      }}
      onClick={() => onOpen(project)}
      className="
        cursor-pointer
        rounded-2xl
        border
        border-yellow-500/15
        bg-neutral-950
        overflow-hidden
        shadow-lg
        transition-all
        duration-300
        hover:border-yellow-500/35
        hover:shadow-2xl
      "
    >
      {/* Project Image */}
      {project.images?.[0] && (
        <img
          src={project.images[0].url}
          alt={project.title}
          className="
            w-full
            h-52
            object-cover
          "
        />
      )}

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-yellow-300">
          {project.title}
        </h3>

        <p className="text-sm text-zinc-400 mt-3 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.technologies
            ?.slice(0, 4)
            .map((tech) => (
              <span
                key={tech}
                className="
                  text-xs
                  px-3
                  py-1
                  rounded-full
                  bg-yellow-500/10
                  text-yellow-300
                  border
                  border-yellow-500/20
                "
              >
                {tech}
              </span>
            ))}
        </div>
      </div>
    </motion.div>
  );
}