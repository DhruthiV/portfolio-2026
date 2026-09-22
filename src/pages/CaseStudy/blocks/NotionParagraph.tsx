/* eslint-disable @typescript-eslint/no-explicit-any */

import { NotionRichText } from "./NotionRichText";

interface NotionParagraphProps {
  block: any;
}

export function NotionParagraph({ block }: NotionParagraphProps) {
  return (
    <p className="whitespace-pre-line text-base leading-7 text-muted-foreground">
      <NotionRichText richText={block.paragraph.rich_text} />
    </p>
  );
}
