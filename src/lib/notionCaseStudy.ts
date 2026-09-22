export async function fetchNotionCaseStudy(id: string) {
  const response = await fetch(`/api/case-study?id=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch case study");
  }

  return response.json();
}
