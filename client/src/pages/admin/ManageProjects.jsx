import { useEffect, useState } from 'react';
import ProjectForm from '../../components/admin/ProjectForm';
import { listProjects, createProject, deleteProject } from '../../services/projectService';
import toast from 'react-hot-toast';

export default function ManageProjects() {
  const [items, setItems] = useState([]);
  const load = () => listProjects().then(setItems);
  useEffect(() => { load(); }, []);
  const create = async (fd) => {
    try {
      await createProject(fd);
      toast.success('Created');
      load();
    } catch (err) {
      console.error('Create project failed', err);
      toast.error(err?.response?.data?.message || 'Create failed');
    }
  };
  const del = async (id) => { await deleteProject(id); toast.success('Deleted'); load(); };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <ProjectForm onSubmit={create} />
        <div className="space-y-3">
          {items.map((p) => (
            <div key={p._id} className="card flex justify-between items-center">
              <div><p className="font-semibold">{p.title}</p><p className="text-xs text-slate-400">{p.technologies?.join(', ')}</p></div>
              <button onClick={() => del(p._id)} className="text-rose-400 text-sm">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
