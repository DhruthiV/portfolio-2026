/* eslint-disable @typescript-eslint/no-explicit-any */
export function getPlainText(richTextArray: any[]): string {
  return (richTextArray ?? []).map((t) => t.plain_text).join("");
}

/* -------------------- Projects -------------------- */

export function mapPageToProject(page: any) {
  const props = page.properties;

  return {
    name: getPlainText(props["Project Name"]?.title) || "Untitled",

    description: getPlainText(props["Project Description"]?.rich_text),

    whatIDid: getPlainText(props["What I Did"]?.rich_text),

    whyIDid: getPlainText(props["Why Description"]?.rich_text),

    whoItHelps: getPlainText(props["Who it helps"]?.rich_text),

    type: props["Project Type"]?.select?.name ?? "",

    density: props["Project Density"]?.select?.name ?? "",

    status: props.Status?.status?.name ?? "",

    techStack: (props["Tech Stack"]?.multi_select ?? []).map(
      (t: any) => t.name,
    ),

    github: props["Github Link"]?.url ?? undefined,

    youtube: props["Youtube Link"]?.url ?? undefined,

    liveUrl: props["Deployed Link"]?.url ?? undefined,

    order: props["Order"]?.number ?? undefined,

    visibility: props["Visibility"]?.checkbox ?? false,
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
