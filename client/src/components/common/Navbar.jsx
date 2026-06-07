import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/skills', 'Skills'],
  ['/projects', 'Projects'],
  ['/experience', 'Experience'],
  ['/github', 'GitHub'],
  ['/resume', 'Resume AI'],
  ['/job-match', 'Job Match'],
  ['/contact', 'Contact'],
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="
        sticky
        top-0
        z-50
        backdrop-blur-xl
        bg-black/80
        border-b
        border-yellow-500/10
      "
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="Vardan Singhal Logo"
            className="
              w-11
              h-11
              object-contain
              drop-shadow-lg
            "
          />

          <div className="leading-tight">
            <p className="font-bold text-yellow-300 text-sm md:text-base">
              Vardan Singhal
            </p>

            <p className="text-xs text-zinc-500">
              AI Developer Hub
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2 text-sm">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `
                px-4
                py-2
                rounded-xl
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
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="
            md:hidden
            p-2
            rounded-xl
            text-yellow-300
            hover:bg-yellow-500/10
            transition
          "
        >
          {mobileOpen ? (
            <FiX size={24} />
          ) : (
            <FiMenu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="
              md:hidden
              overflow-hidden
              border-t
              border-yellow-500/10
              bg-black/95
              backdrop-blur-xl
            "
          >
            <div className="px-4 py-3 flex flex-col gap-2">
              {links.map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `
                    px-4
                    py-3
                    rounded-xl
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-300'
                        : 'text-zinc-400 hover:bg-yellow-500/5 hover:text-yellow-300'
                    }
                  `
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}