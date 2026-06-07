import { NavLink } from 'react-router-dom';

const items = [
  ['/admin', 'Dashboard'],
  ['/admin/projects', 'Projects'],
  ['/admin/knowledge', 'Knowledge Base'],
];

export default function Sidebar() {
  return (
    <aside
      className="
        w-60
        bg-black
        border-r
        border-yellow-500/10
        p-6
        space-y-2
      "
    >
      <h2 className="font-bold text-xl text-yellow-300 mb-6">
        Admin Panel
      </h2>

      {items.map(([to, label]) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            `
            block
            px-4
            py-3
            rounded-xl
            text-sm
            font-medium
            transition-all
            duration-200
            ${
              isActive
                ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-300'
                : 'text-zinc-400 hover:text-yellow-300 hover:bg-yellow-500/5'
            }
          `
          }
        >
          {label}
        </NavLink>
      ))}
    </aside>
  );
}