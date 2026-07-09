/// <reference types="node" />
// Vercel auto-detects anything in /api as a serverless function.
// This is the ONLY place your Notion token should ever exist.
// File name matters: this must be exactly "notion-projects.ts" to match
// the fetch("/api/notion-projects") call in src/lib/notionProjects.ts.

export const config = { runtime: "nodejs" };

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!token || !databaseId) {
    res.status(500).json({
      error: "NOTION_TOKEN / NOTION_DATABASE_ID not set on the server",
    });
    return;
  }

  try {
    const notionRes = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page_size: 10,
          filter: {
            property: "Status",
            status: {
              equals: "Completed",
            },
          },
        }),
      },
    );

    if (!notionRes.ok) {
      const errText = await notionRes.text();
      res.status(notionRes.status).json({ error: errText });
      return;
    }

    const data = await notionRes.json();
    const projects = data.results.map(mapPageToProject);

    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=86400",
    );
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to reach Notion" });
  }
}

function getPlainText(richTextArray: any[]): string {
  return (richTextArray ?? []).map((t) => t.plain_text).join("");
}

// Mapped to your actual Notion columns from the screenshot:
// Project Description, Status, Link, Github Link, Tech Stack, Purpose, Year, Part, Kind
function mapPageToProject(page: any) {
  const props = page.properties;
  return {
    name: getPlainText(props["Project Name"]?.title) || "Untitled",
    emoji: page.icon?.type === "emoji" ? page.icon.emoji : "📦",
    desc: getPlainText(props["Project Description"]?.rich_text),
    category: props.Part?.select?.name ?? "",
    kind: props.Kind?.select?.name ?? "",
    status: props.Status?.status?.name ?? "",
    tech: (props["Tech Stack"]?.multi_select ?? []).map((t: any) => t.name),
    github: props["Github Link"]?.url ?? undefined,
    live: props.Link?.url ?? undefined,
  };
}
