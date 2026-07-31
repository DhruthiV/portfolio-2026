// ─── Edit these once and every component picks them up ───────────────────

export const SITE_CONFIG = {
  name: "Dhruthi V H",
  initials: "DVH",
  headline: "Building, Exploring and Learning!",
  role: "Software Engineer",
  summary: [
    " Building full-stack applications, designing systems, and continuously learning new technologies.",
  ],
  email: "dhruthivenkateshheerguppe@gmail.com",
  socials: {
    github: "https://github.com/dhruthiv",
    linkedin: "https://linkedin.com/in/dhruthi-venkatesh-heerguppe",
  },
  contactLine: "Let's connect! I typically reply within a business day.",
  notionProjectsUrl:
    "https://app.notion.com/p/dhruthivh/3ae8debe72c980518dc1f690ca4d66eb?v=3ae8debe72c98064a2fb000c563ddea5",
};

// "Request latest resume" mailto button on the Home page
export const RESUME_REQUEST_MAILTO = {
  to: SITE_CONFIG.email,
  subject: "Request for Your Latest Resume",
  body: [
    "Dear Dhruthi,",
    "",
    "I hope you are doing well.",
    "",
    "My name is [YOUR NAME]. I would like to request a copy of your latest resume.",
    "",
    "Reason for my request:",
    "[PLEASE ADD YOUR MESSAGE HERE]",
    "",
    "I would appreciate it if you could share it at your convenience.",
    "",
    "Thank you for your time. I look forward to hearing from you.",
    "",
    "Kind regards,",
    "[YOUR NAME]",
    "[COMPANY / ORGANIZATION (Optional)]",
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
