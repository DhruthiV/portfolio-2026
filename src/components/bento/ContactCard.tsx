import { useState } from "react";
import { Copy, Check, FileText } from "lucide-react";
import {
  SITE_CONFIG,
  RESUME_REQUEST_MAILTO,
  buildMailtoLink,
} from "../../config";
import { BentoCard } from "./BentoCard";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";

export function ContactCard() {
  const [copied, setCopied] = useState(false);
  const resumeMailto = buildMailtoLink(RESUME_REQUEST_MAILTO);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy email:", error);

      alert(
        `Unable to copy the email automatically.\n\nPlease copy it manually:\n${SITE_CONFIG.email}`,
      );
    }
  };

  return (
    <BentoCard className="gap-3">
      <h2
        className="text-sm font-semibold text-foreground"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Contact
      </h2>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-muted/40 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {copied ? (
          <>
            <Check size={14} className="text-emerald-600" />
            Email Copied!
          </>
        ) : (
          <>
            <Copy size={14} />
            Copy Email
          </>
        )}
      </button>

      <a
        href={resumeMailto}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        <FileText size={14} /> Request latest resume
      </a>

      <div className="flex items-start gap-2">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs text-muted-foreground">
          {SITE_CONFIG.contactLine}
        </span>
      </div>
      <div className="flex items-center justify-center gap-1.5 shrink-0">
        <a
          href={SITE_CONFIG.socials.github}
          aria-label="GitHub"
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
        >
          <GithubIcon size={16} />
        </a>
        <a
          href={SITE_CONFIG.socials.linkedin}
          aria-label="LinkedIn"
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
        >
          <LinkedinIcon size={16} />
        </a>
      </div>
    </BentoCard>
  );
}
