import type { ReactNode } from "react";
import { motion } from "motion/react";

interface MainCardProps {
  children: ReactNode;
  className?: string;
}

export function MainCard({ children, className = "" }: MainCardProps) {
  return (
    <motion.div
      className={`
        relative
        h-fit
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-card/80
        backdrop-blur-sm
        p-5
        flex
        flex-col
        ${className}
      `}
      initial={{
        boxShadow: "0 2px 8px rgb(0 0 0 / 0.04)",
      }}
      whileHover={{
        y: -3,
        scale: 1.008,
        boxShadow: "0 18px 40px rgb(0 0 0 / 0.10)",
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 24,
      }}
    >
      {children}
    </motion.div>
  );
}
