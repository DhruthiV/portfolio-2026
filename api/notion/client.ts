/// <reference types="node" />

const NOTION_VERSION = "2022-06-28";

export async function queryDatabase(body: Record<string, unknown>) {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!token) {
    throw new Error("NOTION_TOKEN is not configured.");
  }

  if (!databaseId) {
    throw new Error("NOTION_PROJECTS_DATABASE_ID not configured.");
  }

  const response = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}
