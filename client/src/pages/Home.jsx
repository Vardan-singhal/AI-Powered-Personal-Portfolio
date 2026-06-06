import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiCpu,
  FiFileText,
  FiGithub,
} from 'react-icons/fi';
import { TypeAnimation } from 'react-type-animation';

import { getPageContent } from '../services/pageContentService';
import ProfileHero from '../components/common/ProfileHero';

const ICON_MAP = {
  FiCpu,
  FiFileText,
  FiGithub,
};

export default function Home() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPageContent('home')
      .then((page) => setContent(page.content))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-28 text-center">
        Loading...
      </div>
    );
  }

  if (!content) return null;

  const hero = content.hero;
  const features = content.features;

  const roleSequence = hero.roles
    ? hero.roles.flatMap((role) => [role, 1500])
    : [
        'Frontend Developer',
        1500,
        'MERN Stack Developer',
        1500,
        'AI Enthusiast',
        1500,
        'Full Stack Developer',
        1500,
      ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-grad-hero opacity-20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT SIDE */}
            <div className="text-center lg:text-left">

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="pb-3 text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
              >
                {hero.title}
              </motion.h1>

              {/* Animated Roles */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 min-h-[60px] flex items-center justify-center lg:justify-start"
              >
                <TypeAnimation
                  sequence={roleSequence}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-xl md:text-4xl font-semibold text-brand-500"
                />
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0"
              >
                {hero.subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-3 justify-center lg:justify-start mt-8"
              >
                {hero.ctas.map((cta, i) => (
                  <Link
                    key={i}
                    to={cta.link}
                    className={
                      cta.variant === 'primary'
                        ? 'btn-primary inline-flex items-center gap-2'
                        : 'btn-ghost'
                    }
                  >
                    {cta.text}
                    {cta.variant === 'primary' && (
                      <FiArrowRight />
                    )}
                  </Link>
                ))}
              </motion.div>

              {/* Tech Stack Pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap gap-3 mt-10 justify-center lg:justify-start"
              >
                <span className="tech-pill">React</span>
                <span className="tech-pill">Node.js</span>
                <span className="tech-pill">MongoDB</span>
                <span className="tech-pill">Express</span>
                <span className="tech-pill">AI</span>
              </motion.div>
            </div>

            {/* RIGHT SIDE */}
            <ProfileHero />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {features.map((feature, i) => {
          const IconComponent =
            ICON_MAP[feature.icon] || FiCpu;

          return (
            <Feature
              key={i}
              icon={<IconComponent />}
              title={feature.title}
              body={feature.body}
            />
          );
        })}
      </section>
    </div>
  );
}

function Feature({ icon, title, body }) {
  return (
    <div className="card">
      <div className="w-10 h-10 rounded-lg bg-brand-500/15 flex items-center justify-center text-brand-500 text-xl">
        {icon}
      </div>

      <h3 className="font-semibold mt-4">
        {title}
      </h3>

      <p className="text-sm text-slate-400 mt-2">
        {body}
      </p>
    </div>
  );
}