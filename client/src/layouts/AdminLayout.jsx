import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-black text-zinc-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className="
          flex-1
          p-6
          md:p-8
          bg-gradient-to-br
          from-black
          via-neutral-950
          to-black
          overflow-y-auto
        "
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}