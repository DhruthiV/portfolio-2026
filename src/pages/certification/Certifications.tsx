import { useState } from "react";

import { Button } from "@/components/ui/button";

import { CertificateViewer } from "./CertificateViewer";
import { CERTIFICATES } from "@/data/certificates";

const CERTIFICATION_PREVIEW_IMAGE =
  "src/certificates/certification-preview.png";

export function Certifications() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <>
      <section className="flex min-h-[60vh] flex-col gap-8">
        <h2 className="text-center text-2xl font-semibold text-foreground">
          Certification
        </h2>

        <div className="grid items-center gap-10 md:grid-cols-[minmax(592,0.8fr)_1.2fr]">
          {/* Homepage-only image */}
          <div className="flex h-full min-h-[100px] items-stretch justify-center">
            <img
              src={CERTIFICATION_PREVIEW_IMAGE}
              alt=""
              className="h-full w-full rounded-xl object-cover"
            />
          </div>

          {/* Certification information */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold tracking-tight">
              Google UX Design Professional Certificate (In Progress)
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Building a structured foundation in UX design - from user research
              to prototyping to support my transition from frontend engineering
              into product design.
            </p>

            <ul className="mt-5 space-y-2">
              <li className="relative pl-5 text-sm leading-relaxed text-foreground/90">
                <span className="absolute left-0 text-primary">•</span>
                User research, Understanding Business, wireframing, and low to
                high-fidelity prototyping in Figma.
              </li>

              <li className="relative pl-5 text-sm leading-relaxed text-foreground/90">
                <span className="absolute left-0 text-primary">•</span>
                Applying design principles alongside my existing frontend
                development experience
              </li>
            </ul>

            <Button
              type="button"
              variant="default"
              className="mt-6 w-fit"
              onClick={() => setIsViewerOpen(true)}
            >
              View Certificates
            </Button>
          </div>
        </div>
      </section>

      {isViewerOpen && (
        <CertificateViewer
          certificates={CERTIFICATES}
          onClose={() => setIsViewerOpen(false)}
        />
      )}
    </>
  );
}
