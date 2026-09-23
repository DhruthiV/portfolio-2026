/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotionRichText } from "./NotionRichText";

interface NotionCodeProps {
  block: any;
}

export function NotionCode({ block }: NotionCodeProps) {
  const code = block.code;

  return (
    <figure className="overflow-hidden rounded-xl border bg-muted/40">
      <pre className="overflow-x-auto p-4 text-sm leading-6">
        <code>
          <NotionRichText richText={code.rich_text} />
        </code>
      </pre>

      {code.caption?.length > 0 && (
        <figcaption className="border-t px-4 py-2 text-sm text-muted-foreground">
          <NotionRichText richText={code.caption} />
        </figcaption>
      )}
    </figure>
  );
}
