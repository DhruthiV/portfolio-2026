import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "../config";
import { MainCard } from "../components/common/MainCard";

import profile from "../../public/portfolio-photo-dhruthi.png";
import profileVideo from "../../public/portfolio-video-dhruthi.webm";

export function Identity() {
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
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <MainCard className="relative overflow-hidden gap-4 items-center text-center">
      {/* Photo / video — soft circular glow behind, rectangle stays uncropped */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative mt-2 h-45 w-37 select-none"
      >
        <div className="absolute inset-0 rounded-full bg-primary/15 blur-xl" />

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

        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
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
        >
          <source src={profileVideo} type="video/webm" />
        </video>
      </div>

      {/* Name / role / one-line bio */}
      <div>
        <h1
          className="text-lg font-bold text-foreground leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {SITE_CONFIG.name}
        </h1>
        <p className="mt-1 text-sm font-medium text-primary">
          {SITE_CONFIG.role}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {SITE_CONFIG.headline}
        </p>
      </div>
    </MainCard>
  );
}
