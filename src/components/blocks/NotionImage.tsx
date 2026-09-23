/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotionRichText } from "./NotionRichText";

interface NotionImageProps {
  block: any;
}
export function NotionImage({ block }: NotionImageProps) {
  const image = block.image;

  const src =
    image?.type === "external" ? image.external?.url : image?.file?.url;

  if (!src) {
    return null;
  }

  return (
    <figure className="space-y-2">
      <div className="aspect-video w-full overflow-hidden rounded-xl">
        <img src={src} alt="" className="h-full w-full object-cover" />
      </div>

      {image.caption?.length > 0 && (
        <figcaption className="text-center text-sm text-muted-foreground">
          <NotionRichText richText={image.caption} />
        </figcaption>
      )}
    </figure>
  );
}
