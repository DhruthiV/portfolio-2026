/* eslint-disable @typescript-eslint/no-explicit-any */

import { NotionBlock } from "./NotionBlock";

interface NotionRendererProps {
  blocks: any[];
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  const elements: React.ReactNode[] = [];

  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index];

    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item"
    ) {
      const listType = block.type;

      const items = [];

      while (index < blocks.length && blocks[index].type === listType) {
        items.push(blocks[index]);
        index++;
      }

      const ListTag = listType === "numbered_list_item" ? "ol" : "ul";

      elements.push(
        <ListTag
          key={block.id}
          className={
            ListTag === "ol"
              ? "ml-6 list-decimal space-y-2"
              : "ml-6 list-disc space-y-2"
          }
        >
          {items.map((item) => (
            <NotionBlock key={item.id} block={item} />
          ))}
        </ListTag>,
      );

      continue;
    }

    elements.push(<NotionBlock key={block.id} block={block} />);

    index++;
  }

  return <article className="space-y-6">{elements}</article>;
}
