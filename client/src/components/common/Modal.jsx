import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({
  open,
  onClose,
  children,
  title,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="
            fixed
            inset-0
            z-50
            bg-black/80
            backdrop-blur-md
            flex
            items-center
            justify-center
            p-4
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: 0.2,
            }}
            onClick={(e) => e.stopPropagation()}
            className="
              w-full
              max-w-3xl
              max-h-[85vh]
              overflow-y-auto
              rounded-2xl
              border
              border-yellow-500/15
              bg-neutral-950
              p-6
              shadow-2xl
            "
          >
            {title && (
              <h2 className="text-2xl font-bold text-yellow-300 mb-6">
                {title}
              </h2>
            )}

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}