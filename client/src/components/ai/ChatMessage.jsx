import ReactMarkdown from 'react-markdown';
import ProjectCard from './ProjectCard';

export default function ChatMessage({
  role,
  content,
  sources,
  type,
  projects,
}) {
  const isUser = role === 'user';

  // Project cards response
  if (type === 'projects') {
    return (
      <div className="flex justify-start">
        <div className="max-w-[95%] space-y-3">
          <p className="text-sm text-slate-300">
            Here are some of my projects:
          </p>

          {projects?.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
          isUser
            ? 'bg-brand-600 text-white'
            : 'bg-white/10 text-slate-100'
        }`}
      >
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {sources?.length > 0 && (
          <p className="text-xs text-slate-400 mt-1">
            Sources: {sources.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}