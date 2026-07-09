/* eslint-disable @typescript-eslint/no-explicit-any */
export function getPlainText(richTextArray: any[]): string {
  return (richTextArray ?? []).map((t) => t.plain_text).join("");
}

/* -------------------- Projects -------------------- */

export function mapPageToProject(page: any) {
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

/* ---------------- Current Focus ---------------- */

export function mapPageToCurrentFocus(page: any) {
  const props = page.properties;

  return {
    type: props.Type?.select?.name ?? "Learning",

    title: getPlainText(props.Title?.rich_text),

    description: getPlainText(props.Description?.rich_text),

    skills: (props["Tech Stack"]?.multi_select ?? []).map((t: any) => t.name),
  };
}
