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
    pic:
      props["pic"]?.files?.[0]?.file?.url ??
      props["pic"]?.files?.[0]?.external?.url ??
      undefined,

    slug: getPlainText(props["Project Slug"]?.rich_text) || undefined,

    caseStudyId: getPlainText(props["Case Study Id"]?.rich_text) || undefined,

    whatIDid: getPlainText(props["What I did"]?.rich_text),

    whyIDid: getPlainText(props["Why I did"]?.rich_text),

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
/* eslint-disable @typescript-eslint/no-explicit-any */

function getText(block: any) {
  const richText = block[block.type]?.rich_text ?? [];
  return richText.map((t: any) => t.plain_text).join("");
}

export function mapBlocksToCurrentWork(blocks: any[]) {
  type Profile = {
    bio: {
      headline: string;
      blocks: any[];
    };

    currentWork: {
      type: string;
      title: string;
      description: string;
    };

    skills: string[];
  };

  const result: Profile = {
    bio: {
      headline: "",
      blocks: [],
    },

    currentWork: {
      type: "",
      title: "",
      description: "",
    },

    skills: [],
  };

  let currentSection = "";

  for (const block of blocks) {
    if (block.type === "heading_1") {
      currentSection = getText(block);
      continue;
    }

    // Bio headline
    if (currentSection === "bio_headline" && block.type === "paragraph") {
      result.bio.headline = getText(block);
      continue;
    }

    // Bio content
    if (currentSection === "bio_summary") {
      result.bio.blocks.push(block);
      continue;
    }

    // Current work
    if (
      currentSection === "current_work_type" ||
      currentSection === "current_work_title" ||
      currentSection === "current_work_description"
    ) {
      if (block.type !== "paragraph") continue;

      const text = getText(block);

      if (currentSection === "current_work_type") {
        result.currentWork.type = text;
      }

      if (currentSection === "current_work_title") {
        result.currentWork.title = text;
      }

      if (currentSection === "current_work_description") {
        result.currentWork.description = text;
      }

      continue;
    }

    // Skills
    if (
      currentSection === "skills_current_focus" &&
      block.type === "numbered_list_item"
    ) {
      result.skills.push(getText(block));
    }
  }

  return result;
}
