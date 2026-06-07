import { Link } from 'react-router-dom';
import {
  FiGithub,
  FiLinkedin,
  FiMail,
} from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-yellow-500/10 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-grad-hero bg-clip-text text-transparent">
              Vardan Singhal
            </h3>

            <p className="mt-4 text-zinc-400 text-sm leading-relaxed max-w-sm">
              Full Stack Developer specializing in MERN Stack,
              AI-powered applications, modern web experiences,
              and scalable backend systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-yellow-300 mb-4">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/" className="text-zinc-400 hover:text-yellow-300 transition">
                Home
              </Link>

              <Link to="/about" className="text-zinc-400 hover:text-yellow-300 transition">
                About
              </Link>

              <Link to="/projects" className="text-zinc-400 hover:text-yellow-300 transition">
                Projects
              </Link>

              <Link to="/skills" className="text-zinc-400 hover:text-yellow-300 transition">
                Skills
              </Link>

              <Link to="/experience" className="text-zinc-400 hover:text-yellow-300 transition">
                Experience
              </Link>

              <Link to="/contact" className="text-zinc-400 hover:text-yellow-300 transition">
                Contact
              </Link>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold text-yellow-300 mb-4">
              Connect
            </h4>

            <div className="flex gap-5 text-xl">

              <a
                href="https://github.com/Vardan-singhal"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-zinc-400
                  hover:text-yellow-300
                  hover:scale-110
                  transition-all
                "
              >
                <FiGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/vardan-singhal-612476214/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-zinc-400
                  hover:text-yellow-300
                  hover:scale-110
                  transition-all
                "
              >
                <FiLinkedin />
              </a>

              <a
                href="mailto:vardansinghal30@gmail.com"
                className="
                  text-zinc-400
                  hover:text-yellow-300
                  hover:scale-110
                  transition-all
                "
              >
                <FiMail />
              </a>

            </div>

            <p className="mt-5 text-sm text-zinc-400 leading-relaxed">
              Open to Frontend, MERN Stack, Full Stack and AI-focused
              Software Engineering opportunities.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="
            mt-12
            pt-6
            border-t
            border-yellow-500/10
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-4
            text-sm
            text-zinc-500
          "
        >
          <p>
            © {new Date().getFullYear()} Vardan Singhal.
            All rights reserved.
          </p>

          <p className="text-center md:text-right">
            Built with React • Node.js • Express • MongoDB • OpenAI
          </p>
        </div>
      </div>
    </footer>
  );
}