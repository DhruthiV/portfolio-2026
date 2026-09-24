/* eslint-disable @typescript-eslint/no-explicit-any */
interface NotionRichTextProps {
  richText?: any[];
}

export function NotionRichText({ richText = [] }: NotionRichTextProps) {
  return (
    <>
      {richText.map((text, index) => {
        const content = text.plain_text ?? text.text?.content ?? "";
        const annotations = text.annotations ?? {};
        const href = text.href ?? text.text?.link?.url;

        let element: React.ReactNode = content;

        if (annotations.code) {
          element = (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
              {element}
            </code>
          );
        }

        if (annotations.bold) {
          element = <strong>{element}</strong>;
        }

        if (annotations.italic) {
          element = <em>{element}</em>;
        }

        if (annotations.underline) {
          element = <u>{element}</u>;
        }

        if (annotations.strikethrough) {
          element = <s>{element}</s>;
        }

        if (href) {
          element = (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {element}
            </a>
          );
        }

        return <span key={`${index}-${content}`}>{element}</span>;
      })}
    </>
  );
}
