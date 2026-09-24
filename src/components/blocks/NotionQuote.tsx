/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotionRichText } from "./NotionRichText";

interface NotionQuoteProps {
  block: any;
}

export function NotionQuote({ block }: NotionQuoteProps) {
  return (
    <blockquote className="border-l-2 pl-5 text-lg italic leading-8 text-muted-foreground">
      <NotionRichText richText={block.quote?.rich_text} />
    </blockquote>
  );
}
