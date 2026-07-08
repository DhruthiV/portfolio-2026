import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "../../config";
import { BentoCard } from "./BentoCard";

import profile from "../../assets/portfolio-photo-dhruthi.png";
import profileVideo from "../../assets/portfolio-video-dhruthi.webm";

export function AboutCard() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState(false);

  const handleMouseEnter = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      setPlaying(true);
      video.currentTime = 0;
      await video.play();
    } catch {
      setPlaying(false);
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;

    if (!video) return;

    video.pause();
    video.currentTime = 0;
    setPlaying(false);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleEnded = () => {
      video.currentTime = 0;
      setPlaying(false);
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <BentoCard className="relative overflow-hidden gap-4">
      {/* Glow */}
      <div className="absolute -top-12 -right-8 h-72 w-72 rounded-full bg-primary/10 blur-[80px]" />

      {/* Image / Video */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="
          absolute
          -right-1
          top-0
          h-48
          w-40
          z-0
          select-none
        "
      >
        {/* Image */}
        <img
          src={profile}
          alt={SITE_CONFIG.name}
          draggable={false}
          className={`
            absolute inset-0
            h-full
            w-full
            object-contain
            transition-opacity duration-300
            pointer-events-none
            ${playing ? "opacity-0" : "opacity-95"}
          `}
        />

        {/* Video */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
          className={`
            absolute inset-0
            h-full
            w-full
            object-contain
            transition-opacity duration-300
            pointer-events-none
            ${playing ? "opacity-95" : "opacity-0"}
          `}
          src={profileVideo}
        >
          <source src={profileVideo} type="video/webm" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[65%]">
        <h1
          className="text-xl font-bold text-foreground leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {SITE_CONFIG.name}
        </h1>

        <p className="mt-1 text-sm font-medium text-primary">
          {SITE_CONFIG.role}
        </p>
      </div>

      <p className="relative z-10 max-w-[60%] text-[13px] leading-relaxed text-muted-foreground sm:max-w-[65%] sm:text-sm">
        {SITE_CONFIG.summary}
      </p>

      <div className="relative z-10 mt-auto flex items-start gap-2">
        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green-500 animate-pulse" />

        <span className="text-xs text-muted-foreground break-words">
          {SITE_CONFIG.headline}
        </span>
      </div>
    </BentoCard>
  );
}
