/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotionRichText } from "./NotionRichText";

interface NotionListProps {
  block: any;
}

export function NotionList({ block }: NotionListProps) {
  const type = block.type;
  const richText = block[type]?.rich_text ?? [];

  return (
    <li className="text-base leading-7 text-muted-foreground">
      <NotionRichText richText={richText} />
    </li>
  );
}
