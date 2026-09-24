/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotionRichText } from "./NotionRichText";

interface NotionHeadingProps {
  block: any;
}

export function NotionHeading({ block }: NotionHeadingProps) {
  const { type } = block;

  const richText = block[type]?.rich_text ?? [];

  if (type === "heading_1") {
    return (
      <h2 className="pt-4 text-3xl font-bold tracking-tight text-foreground">
        <NotionRichText richText={richText} />
      </h2>
    );
  }

  if (type === "heading_2") {
    return (
      <h3 className="pt-3 text-2xl font-semibold tracking-tight text-foreground">
        <NotionRichText richText={richText} />
      </h3>
    );
  }

  return (
    <h4 className="pt-2 text-xl font-semibold text-foreground">
      <NotionRichText richText={richText} />
    </h4>
  );
}
