import { useEffect, useState } from 'react';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectModal from '../components/projects/ProjectModal';
import Loader from '../components/common/Loader';
import { listProjects } from '../services/projectService';

export default function Projects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  useEffect(() => { listProjects().then(setItems).finally(() => setLoading(false)); }, []);
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold">Projects</h1>
      {loading ? <Loader /> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {items.map((p) => <ProjectCard key={p._id} project={p} onOpen={setOpen} />)}
        </div>
      )}
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </div>
  );
}
