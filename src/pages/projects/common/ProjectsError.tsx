import { SITE_CONFIG } from "@/config";
import { AlertCircle, ExternalLink } from "lucide-react";

function ProjectsError() {
  return (
    <div className="max-w-md rounded-xl border border-border bg-card p-10 text-center">
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
        <AlertCircle size={18} className="text-amber-600" />
      </div>
      <h3 className="mb-2 text-sm font-medium text-foreground">
        Couldn't load the live project list.
      </h3>
      <p className="mb-5 text-xs leading-6 text-muted-foreground">
        The Notion connection is temporarily unavailable.
      </p>
      <a
        href={SITE_CONFIG.notionProjectsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        View on Notion
        <ExternalLink size={13} />
      </a>
    </div>
  );
}
export default ProjectsError;
