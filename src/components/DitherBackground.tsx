import { motion } from "framer-motion";

export function DitherBackground() {
  return (
    <>
      <div className="bg-noise fixed inset-0 z-0 pointer-events-none opacity-[0.04]" />
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-background">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-brand-orange/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen filter"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-brand-gold/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen filter"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-brand-green/15 blur-[100px] mix-blend-multiply dark:mix-blend-screen filter"
        />
      </div>
    </>
  );
}


