import { useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { Certificate } from "@/data/certificates";

interface CertificateViewerProps {
  certificates: Certificate[];
  onClose: () => void;
}

export function CertificateViewer({
  certificates,
  onClose,
}: CertificateViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCertificate = certificates[currentIndex];

  if (!currentCertificate) {
    return null;
  }

  const showPrevious = () => {
    setCurrentIndex((current) =>
      current === 0 ? certificates.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setCurrentIndex((current) =>
      current === certificates.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/20 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Certificate viewer"
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close certificate viewer"
        className="absolute right-6 top-6 z-10 rounded-full bg-background/70 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Previous */}
      {certificates.length > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            showPrevious();
          }}
          aria-label="Previous certificate"
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/70 p-3 text-foreground backdrop-blur-sm transition-colors hover:bg-background md:left-8"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}

      {/* Certificate image */}
      <div
        className="flex h-[75vh] w-[75vw] items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={currentCertificate.image}
          alt={currentCertificate.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Next */}
      {certificates.length > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            showNext();
          }}
          aria-label="Next certificate"
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/70 p-3 text-foreground backdrop-blur-sm transition-colors hover:bg-background md:right-8"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      )}

      {/* Position */}
      {certificates.length > 1 && (
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
          {currentIndex + 1} / {certificates.length}
        </span>
      )}
    </div>
  );
}
