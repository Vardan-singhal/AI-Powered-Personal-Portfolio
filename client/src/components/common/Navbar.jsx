import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [
  ['/', 'Home'], ['/about', 'About'], ['/skills', 'Skills'],
  ['/projects', 'Projects'], ['/experience', 'Experience'],
  ['/github', 'GitHub'], ['/resume', 'Resume AI'], ['/job-match', 'Job Match'], ['/contact', 'Contact'],
];

export default function Navbar() {
  return (
    <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg bg-grad-hero bg-clip-text text-transparent">AI Powered Portfolio</Link>
        <nav className="hidden md:flex gap-1 text-sm">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) => `px-3 py-2 rounded-lg transition ${isActive ? 'text-white bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
