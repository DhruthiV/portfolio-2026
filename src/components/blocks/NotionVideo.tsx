/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotionRichText } from "./NotionRichText";

interface NotionVideoProps {
  block: any;
}

function getYouTubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);

  if (!match) {
    return null;
  }

  return `https://www.youtube.com/embed/${match[1]}`;
}

export function NotionVideo({ block }: NotionVideoProps) {
  const video = block.video;

  if (!video) {
    return null;
  }

  if (video.type === "external" && video.external?.url) {
    const url = video.external.url;
    const youtubeUrl = getYouTubeEmbedUrl(url);

    if (youtubeUrl) {
      return (
        <figure className="space-y-2">
          <div className="aspect-video w-full overflow-hidden rounded-xl">
            <iframe
              src={youtubeUrl}
              title="YouTube video"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {video.caption?.length > 0 && (
            <figcaption className="text-center text-sm text-muted-foreground">
              <NotionRichText richText={video.caption} />
            </figcaption>
          )}
        </figure>
      );
    }

    return <video src={url} controls className="w-full rounded-xl" />;
  }

  if (video.type === "file" && video.file?.url) {
    return (
      <figure className="space-y-2">
        <video src={video.file.url} controls className="w-full rounded-xl" />

        {video.caption?.length > 0 && (
          <figcaption className="text-center text-sm text-muted-foreground">
            <NotionRichText richText={video.caption} />
          </figcaption>
        )}
      </figure>
    );
  }

  return null;
}
