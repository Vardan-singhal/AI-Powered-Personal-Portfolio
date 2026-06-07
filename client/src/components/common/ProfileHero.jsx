import { motion } from 'framer-motion';
import profile from '../../assets/profile.png';

export default function ProfileHero() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex justify-center items-center py-20 md:py-8 px-6"
    >
      {/* Gold Glow */}
      <div className="absolute w-80 h-80 md:w-[420px] md:h-[420px] rounded-full bg-yellow-500/10 blur-[100px]" />

      {/* Secondary Gold Glow */}
      <div className="absolute w-72 h-72 md:w-[360px] md:h-[360px] rounded-full bg-amber-500/10 blur-[90px]" />

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
          bg-yellow-500/10
          border
          border-yellow-500/25
          backdrop-blur-md
          text-xs
          font-medium
          text-yellow-300
        "
      >
        ✨ Open to Opportunities
      </motion.div>

      {/* Profile Image */}
      <div className="relative z-10">
        {/* Decorative Ring */}
        <div className="absolute inset-0 rounded-full border border-yellow-500/10 scale-110" />

        <motion.img
          src={profile}
          alt="Vardan Singhal"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          style={{
            objectPosition: 'center 10%',
          }}
          className="
            relative
            w-52
            h-52
            sm:w-72
            sm:h-72
            md:w-[420px]
            md:h-[420px]
            object-cover
            rounded-full
            border-4
            border-yellow-500/15
            shadow-2xl
            bg-neutral-900
          "
        />
      </div>

      {/* React */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="
          absolute
          top-4
          left-0
          md:top-10
          md:left-0
          tech-pill
          text-xs
          sm:text-sm
        "
      >
        ⚛ React
      </motion.div>

      {/* Node.js */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="
          absolute
          top-12
          right-0
          md:top-28
          md:right-0
          tech-pill
          text-xs
          sm:text-sm
        "
      >
        🟢 Node.js
      </motion.div>

      {/* MongoDB */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity }}
        className="
          absolute
          bottom-20
          left-0
          md:bottom-24
          md:left-0
          tech-pill
          text-xs
          sm:text-sm
        "
      >
        🍃 MongoDB
      </motion.div>

      {/* Express */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity }}
        className="
          absolute
          bottom-0
          left-4
          md:bottom-6
          md:left-10
          tech-pill
          text-xs
          sm:text-sm
        "
      >
        🚀 Express
      </motion.div>

      {/* AI */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.8, repeat: Infinity }}
        className="
          absolute
          bottom-6
          right-0
          md:bottom-12
          md:right-4
          tech-pill
          text-xs
          sm:text-sm
        "
      >
        🤖 AI
      </motion.div>
    </motion.div>
  );
}