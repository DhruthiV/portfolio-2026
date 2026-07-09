// ─── Edit these once and every component picks them up ───────────────────

export const SITE_CONFIG = {
  name: "Dhruthi V H",
  initials: "DVH",
  headline:
    "Let's connect to talk tech, architecture, or potential collaborations.",
  role: "Software Engineer",
  summary:
    "Building full-stack applications, exploring scalable system design, and continuously learning modern technologies.",
  email: "dhruthivenkateshheerguppe@gmail.com",
  socials: {
    github: "https://github.com/dhruthiv",
    linkedin: "https://linkedin.com/in/dhruthi-venkatesh-heerguppe",
  },
  contactLine: "Let's connect! I typically reply within a business day.",
  notionProjectsUrl:
    "https://dhruthivh.notion.site/2508debe72c980a39969f972dfe7706a?v=2508debe72c980a89df1000c2570ddf0",
};

// "Request latest resume" mailto button on the Home page
export const RESUME_REQUEST_MAILTO = {
  to: SITE_CONFIG.email,
  subject: "Requesting your latest resume",
  body: [
    "Hi Dhruthi,",
    "",
    "I am [YOUR NAME] from [YOUR COMPANY / REASON].",
    "I am requesting your latest resume.",
    "",
    "Thanks,",
    "[YOUR NAME]",
  ].join("\n"),
};

export function buildMailtoLink({
  to,
  subject,
  body,
}: {
  to: string;
  subject?: string;
  body?: string;
}) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${to}${query ? `?${query}` : ""}`;
}
