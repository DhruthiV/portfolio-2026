/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="node" />

import { queryDatabase } from "./client.js";
import { mapDBToProject } from "./utils.js";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = await queryDatabase({
      page_size: 20,
    });

    const projects = data.results.map(mapDBToProject);

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

    return res.status(200).json(projects);
  } catch (err: any) {
    return res.status(500).json({
      error: err.message,
    });
  }
}
