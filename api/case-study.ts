/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="node" />

import { getPageBlocks, getBlockChildren } from "./client.js";

export const config = {
  runtime: "nodejs",
};

async function attachChildren(block: any): Promise<any> {
  if (!block.has_children) {
    return block;
  }

  const data = await getBlockChildren(block.id);

  const children = await Promise.all(
    data.results.map((child: any) => attachChildren(child)),
  );

  return {
    ...block,
    children,
  };
}

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

    const blocks = await Promise.all(
      data.results.map((block: any) => attachChildren(block)),
    );

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

    return res.status(200).json(blocks);
  } catch (err: any) {
    return res.status(500).json({
      error: err.message,
    });
  }
}
