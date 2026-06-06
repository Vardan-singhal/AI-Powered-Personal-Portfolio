import { NavLink } from 'react-router-dom';
const items = [['/admin','Dashboard'],['/admin/projects','Projects'],['/admin/knowledge','Knowledge Base']];
export default function Sidebar() {
  return (
    <aside className="w-60 border-r border-white/10 p-6 space-y-2">
      <h2 className="font-bold mb-4">Admin</h2>
      {items.map(([to, l]) => (
        <NavLink key={to} to={to} end className={({ isActive }) => `block px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'}`}>{l}</NavLink>
      ))}
    </aside>
  );
}
