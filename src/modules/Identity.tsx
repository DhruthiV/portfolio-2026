import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "../config";

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
    <div className="flex flex-col items-center text-center w-full gap-3">
      {/* Photo / video module */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative h-42 w-34 select-none mx-auto"
      >
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
        <img
          src={"/portfolio-photo-dhruthi.png"}
          alt={SITE_CONFIG.name}
          draggable={false}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 pointer-events-none ${
            playing ? "opacity-0" : "opacity-95"
          }`}
        />
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 pointer-events-none ${
            playing ? "opacity-95" : "opacity-0"
          }`}
        >
          <source src={"/portfolio-video-dhruthi.webm"} type="video/webm" />
        </video>
      </div>

      {/* Profile Descriptions Typography */}
      <div className="w-full">
        <h1 className="text-lg font-bold text-foreground tracking-tight leading-tight">
          {SITE_CONFIG.name}
        </h1>
        <p className="mt-1 text-base font-semibold text-primary font-heading">
          {SITE_CONFIG.role}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground w-full max-w-[240px] mx-auto">
          {SITE_CONFIG.headline}
        </p>
      </div>
    </div>
  );
}
