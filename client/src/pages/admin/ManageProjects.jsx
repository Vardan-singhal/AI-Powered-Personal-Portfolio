import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Loader from '../../components/common/Loader';
import ProjectForm from '../../components/admin/ProjectForm';

import {
  listProjects,
  createProject,
  deleteProject,
} from '../../services/projectService';

export default function ManageProjects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const projects = await listProjects();
      setItems(projects);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (fd) => {
    try {
      await createProject(fd);

      toast.success('Project created');

      load();
    } catch (err) {
      console.error('Create project failed', err);

      toast.error(
        err?.response?.data?.message ||
          'Create failed'
      );
    }
  };

  const del = async (id) => {
    try {
      await deleteProject(id);

      toast.success('Project deleted');

      load();
    } catch (error) {
      console.error(error);

      toast.error('Delete failed');
    }
  };

  if (loading) {
    return <Loader text="Loading Projects..." />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-yellow-300">
        Manage Projects
      </h1>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Create Project */}
        <ProjectForm onSubmit={create} />

        {/* Existing Projects */}
        <div
          className="
            rounded-2xl
            border
            border-yellow-500/15
            bg-neutral-950
            p-5
            shadow-lg
          "
        >
          <h2 className="text-xl font-semibold text-yellow-300 mb-4">
            Existing Projects ({items.length})
          </h2>

          <div className="space-y-3 max-h-[650px] overflow-y-auto pr-2">
            {items.length === 0 ? (
              <div className="text-center py-8 text-zinc-500">
                No projects found.
              </div>
            ) : (
              items.map((project) => (
                <div
                  key={project._id}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    rounded-xl
                    border
                    border-yellow-500/10
                    bg-black
                    p-4
                    transition
                    hover:border-yellow-500/25
                  "
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-yellow-300">
                      {project.title}
                    </p>

                    <p className="text-xs text-zinc-500 mt-1 truncate">
                      {project.technologies?.join(', ')}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      del(project._id)
                    }
                    className="
                      text-red-400
                      text-sm
                      hover:text-red-300
                      transition
                      flex-shrink-0
                    "
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}