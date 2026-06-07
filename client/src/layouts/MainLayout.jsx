import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import AIChat from '../components/ai/AIChat';

export default function MainLayout() {
  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        bg-black
        text-zinc-100
      "
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 relative">
        {/* Background Glow Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="
              absolute
              top-20
              left-10
              w-72
              h-72
              bg-yellow-500/5
              blur-3xl
              rounded-full
            "
          />

          <div
            className="
              absolute
              bottom-20
              right-10
              w-72
              h-72
              bg-yellow-500/5
              blur-3xl
              rounded-full
            "
          />
        </div>

        <div className="relative z-10">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Assistant */}
      <AIChat />
    </div>
  );
}