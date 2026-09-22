/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="node" />

import { getPageBlocks } from "./client.js";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const pageId = req.query.id;

    if (typeof pageId !== "string" || !pageId) {
      return res.status(400).json({
        error: "Case study ID is required.",
      });
    }

    const data = await getPageBlocks(pageId);

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

    return res.status(200).json(data.results);
  } catch (err: any) {
    return res.status(500).json({
      error: err.message,
    });
  }
}
