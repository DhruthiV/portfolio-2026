/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="node" />

import { queryDatabase } from "./notion/client";
import { mapPageToCurrentFocus } from "./notion/utils";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = await queryDatabase({
      page_size: 1,
      filter: {
        property: "Active",
        checkbox: {
          equals: true,
        },
      },
    });

    if (!data.results.length) {
      return res.status(404).json({ error: "No active focus found." });
    }

    const focus = mapPageToCurrentFocus(data.results[0]);

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

    return res.status(200).json(focus);
  } catch (err: any) {
    return res.status(500).json({
      error: err.message,
    });
  }
}
