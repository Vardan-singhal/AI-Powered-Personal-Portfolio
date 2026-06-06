import { Link } from 'react-router-dom';
import {
  FiGithub,
  FiLinkedin,
  FiMail,
} from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              AI Powered Personal Portfolio
            </h3>

            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Full Stack Developer Portfolio powered by AI.
              Showcasing projects, skills, GitHub analytics,
              resume intelligence, and recruiter-focused experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              Quick Links
            </h4>

            <div className="flex flex-col gap-2 text-slate-400 text-sm">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/skills">Skills</Link>
              <Link to="/experience">Experience</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              Connect
            </h4>

            <div className="flex gap-4 text-xl">

              <a
                href="https://github.com/Vardan-singhal"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition"
              >
                <FiGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/vardan-singhal-612476214/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition"
              >
                <FiLinkedin />
              </a>

              <a
                href="mailto:vardansinghal30.com"
                className="hover:text-cyan-400 transition"
              >
                <FiMail />
              </a>

            </div>

            <p className="mt-4 text-sm text-slate-400">
              Open to Frontend, MERN Stack and Full Stack opportunities.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">

          <p>
            © {new Date().getFullYear()} Vardan Singhal.
            All rights reserved.
          </p>

          <p>
            Built with React • Node.js • MongoDB • Express • Gemini AI
          </p>

        </div>
      </div>
    </footer>
  );
}