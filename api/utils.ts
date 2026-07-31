/* eslint-disable @typescript-eslint/no-explicit-any */
export function getPlainText(richTextArray: any[]): string {
  return (richTextArray ?? []).map((t) => t.plain_text).join("");
}

/* -------------------- Projects -------------------- */

export function mapDBToProject(page: any) {
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

function getText(block: any) {
  const richText = block[block.type]?.rich_text ?? [];
  return richText.map((t: any) => t.plain_text).join("");
}

export function mapBlocksToCurrentWork(blocks: any[]) {
  type CurrentFocus = {
    bio: {
      headline: string;
      summary: string[];
    };
    currentWork: {
      type: string;
      title: string;
      description: string;
    };
    skills: string[];
  };

  type SectionMapValue =
    | { object: "bio"; field: "headline" | "summary" }
    | { object: "currentWork"; field: "type" | "title" | "description" };

  const result: CurrentFocus = {
    bio: {
      headline: "",
      summary: [],
    },

    currentWork: {
      type: "",
      title: "",
      description: "",
    },

    skills: [] as string[],
  };

  const SECTION_MAP: Record<string, SectionMapValue> = {
    bio_headline: {
      object: "bio",
      field: "headline",
    },

    bio_summary: {
      object: "bio",
      field: "summary",
    },

    current_work_type: {
      object: "currentWork",
      field: "type",
    },

    current_work_title: {
      object: "currentWork",
      field: "title",
    },

    current_work_description: {
      object: "currentWork",
      field: "description",
    },
  };

  let currentSection = "";

  for (const block of blocks) {
    // Heading changes the active section
    if (block.type === "heading_1") {
      currentSection = getText(block);
      continue;
    }

    // Handle paragraph-based sections
    const mapping = SECTION_MAP[currentSection as keyof typeof SECTION_MAP];

    if (mapping && block.type === "paragraph") {
      const text = getText(block);

      if (mapping.object === "bio") {
        if (mapping.field === "headline") {
          result.bio.headline = text;
        } else {
          result.bio.summary.push(text);
        }
      } else {
        result.currentWork[mapping.field] = text;
      }

      continue;
    }

    // Handle list-based sections
    if (
      currentSection === "skills_current_focus" &&
      block.type === "numbered_list_item"
    ) {
      result.skills.push(getText(block));
    }
  }

  return result;
}
