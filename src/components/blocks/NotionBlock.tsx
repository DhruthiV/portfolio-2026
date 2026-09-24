/* eslint-disable @typescript-eslint/no-explicit-any */

import { NotionParagraph } from "./NotionParagraph";
import { NotionCallout } from "./NotionCallout";
import { NotionCode } from "./NotionCode";
import { NotionDivider } from "./NotionDivider";
import { NotionHeading } from "./NotionHeading";
import { NotionImage } from "./NotionImage";
import { NotionList } from "./NotionList";
import { NotionQuote } from "./NotionQuote";
import { NotionVideo } from "./NotionVideo";

interface NotionBlockProps {
  block: any;
}

function renderChildren(children: any[]) {
  return children.map((child) => <NotionBlock key={child.id} block={child} />);
}

export function NotionBlock({ block }: NotionBlockProps) {
  switch (block.type) {
    case "paragraph":
      return <NotionParagraph block={block} />;

    case "heading_1":
    case "heading_2":
    case "heading_3":
      return <NotionHeading block={block} />;

    case "bulleted_list_item":
    case "numbered_list_item":
      return <NotionList block={block} />;

    case "image":
      return <NotionImage block={block} />;

    case "video":
      return <NotionVideo block={block} />;

    case "code":
      return <NotionCode block={block} />;

    case "callout":
      return <NotionCallout block={block} />;

    case "quote":
      return <NotionQuote block={block} />;

    case "divider":
      return <NotionDivider />;

    case "column_list":
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {renderChildren(block.children ?? [])}
        </div>
      );

    case "column":
      return (
        <div className="min-w-0 space-y-6">
          {renderChildren(block.children ?? [])}
        </div>
      );

    default:
      console.log("Unsupported Notion block type:", block.type);
      return null;
  }
}
