import { motion } from 'framer-motion';
import profile from '../../assets/profile.png';

export default function ProfileHero() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex justify-center items-center py-8"
    >
      {/* Main Glow */}
      <div className="absolute w-80 h-80 md:w-[420px] md:h-[420px] rounded-full bg-cyan-500/20 blur-[100px]" />

      {/* Secondary Glow */}
      <div className="absolute w-72 h-72 md:w-[360px] md:h-[360px] rounded-full bg-purple-500/20 blur-[90px]" />

      {/* Availability Badge */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="
          absolute
          top-0
          right-0
          z-20
          px-4
          py-2
          rounded-full
          bg-emerald-500/15
          border
          border-emerald-500/30
          backdrop-blur-md
          text-xs
          font-medium
          text-emerald-300
        "
      >
        🟢 Open to Opportunities
      </motion.div>

      {/* Profile Image Container */}
      <div className="relative z-10">
        {/* Ring */}
        <div className="absolute inset-0 rounded-full border border-white/10 scale-110" />

        <motion.img
          src={profile}
          alt="Vardan Singhal"
          whileHover={{
            scale: 1.03,
          }}
          transition={{
            duration: 0.3,
          }}
          style={{
    objectPosition: 'center 10%',
  }}
          className="
            relative
            w-72
            h-72
            md:w-[420px]
            md:h-[420px]
            object-cover
            rounded-full
            border-4
            border-white/10
            shadow-2xl
            bg-slate-900
          "
          
        />
      </div>

      {/* React */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 left-0 tech-pill"
      >
        ⚛ React
      </motion.div>

      {/* Node */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-28 right-0 tech-pill"
      >
        🟢 Node.js
      </motion.div>

      {/* MongoDB */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity }}
        className="absolute bottom-24 left-0 tech-pill"
      >
        🍃 MongoDB
      </motion.div>

      {/* Express */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity }}
        className="absolute bottom-6 left-10 tech-pill"
      >
        🚀 Express
      </motion.div>

      {/* AI */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.8, repeat: Infinity }}
        className="absolute bottom-12 right-4 tech-pill"
      >
        🤖 AI
      </motion.div>
    </motion.div>
  );
}