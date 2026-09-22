/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotionRichText } from "./NotionRichText";

interface NotionCalloutProps {
  block: any;
}

export function NotionCallout({ block }: NotionCalloutProps) {
  const callout = block.callout;

  const emoji = callout.icon?.type === "emoji" ? callout.icon.emoji : null;

  return (
    <div className="flex gap-3 rounded-xl border bg-muted/30 p-4">
      {emoji && (
        <span className="shrink-0 text-xl" aria-hidden="true">
          {emoji}
        </span>
      )}

      <div className="min-w-0 text-base leading-7 text-muted-foreground">
        <NotionRichText richText={callout.rich_text} />
      </div>
    </div>
  );
}
