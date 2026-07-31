import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { buildMailtoLink, RESUME_REQUEST_MAILTO, SITE_CONFIG } from "@/config";
import { Check, Copy, FileText } from "lucide-react";
import { useState } from "react";

export function ContactMe() {
  const [copied, setCopied] = useState(false);
  const resumeMailto = buildMailtoLink(RESUME_REQUEST_MAILTO);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
      alert(
        `Unable to copy the email automatically.\n\nPlease copy it manually:\n${SITE_CONFIG.email}`,
      );
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex flex-col gap-2">
        {/* Email button with matching radius variables */}
        <Button
          onClick={handleCopy}
          className="inline-flex h-8 w-full items-center justify-center gap-2 rounded-(--radius) border border-border bg-muted/40 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
        >
          {copied ? (
            <>
              <Check
                size={14}
                className="text-emerald-500 animate-in zoom-in-50 duration-150"
              />
              <span className="text-emerald-500 font-semibold">
                Email Copied!
              </span>
            </>
          ) : (
            <>
              <Copy size={14} className="text-muted-foreground" />
              <span>Copy Email</span>
            </>
          )}
        </Button>

        <a
          href={resumeMailto}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-8 w-full rounded-(--radius) bg-primary text-primary-foreground text-sm font-medium transition-all duration-150 hover:brightness-110 hover:shadow-sm"
        >
          <FileText size={14} />
          <span>Request Resume</span>
        </a>

        {/* Social Icons Links */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <a
            href={SITE_CONFIG.socials.github}
            aria-label="GitHub Portal Reference"
            className="w-9 h-9 flex items-center justify-center rounded-(--radius) border border-border bg-background/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-150 hover:shadow-sm"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={SITE_CONFIG.socials.linkedin}
            aria-label="LinkedIn Portal Reference"
            className="w-9 h-9 flex items-center justify-center rounded-(--radius) border border-border bg-background/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-150 hover:shadow-sm"
          >
            <LinkedinIcon size={18} />
          </a>
        </div>

        {/* Active Availability Sub-footer Indicator Row */}
        <div className="flex items-center gap-2 bg-muted/20 border border-border/40 p-2.5 rounded-(--radius) mt-1 justify-center">
          <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="text-[10px] leading-tight text-muted-foreground">
            {SITE_CONFIG.contactLine}
          </span>
        </div>
      </div>
    </div>
  );
}
