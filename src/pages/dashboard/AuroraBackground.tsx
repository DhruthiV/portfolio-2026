import { motion } from "motion/react";

// Soft, slow-moving blurred color blobs behind the bento grid.
// Uses the theme's chart colors so it stays in the Nova palette automatically.

export function AuroraBackground() {
  const blobs = [
    {
      color: "var(--chart-1)",
      size: 480,
      top: "-10%",
      left: "5%",
      duration: 22,
    },
    {
      color: "var(--chart-3)",
      size: 520,
      top: "20%",
      left: "60%",
      duration: 26,
    },
    {
      color: "var(--chart-2)",
      size: 420,
      top: "55%",
      left: "15%",
      duration: 30,
    },
    {
      color: "var(--chart-4)",
      size: 460,
      top: "60%",
      left: "70%",
      duration: 24,
    },
  ];

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-background" />

      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full opacity-20 blur-3xl"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: blob.color,
            willChange: "opacity, transform",
          }}
          animate={{
            opacity: [0.12, 0.2, 0.15, 0.12],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-background/40" />
    </div>
  );
}
