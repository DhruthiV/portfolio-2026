import { motion } from "motion/react";

// Soft, slow-moving blurred color blobs behind the bento grid.
// Uses the theme's chart colors so it stays in the Nova palette automatically.
export function AuroraBackground() {
  const blobs = [
    { color: "var(--chart-1)", size: 480, top: "-10%", left: "5%", duration: 22 },
    { color: "var(--chart-3)", size: 520, top: "20%", left: "60%", duration: 26 },
    { color: "var(--chart-2)", size: 420, top: "55%", left: "15%", duration: 30 },
    { color: "var(--chart-4)", size: 460, top: "60%", left: "70%", duration: 24 },
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20 blur-3xl"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: b.color,
          }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Soft fade so cards stay readable */}
      <div className="absolute inset-0 bg-background/40" />
    </div>
  );
}
