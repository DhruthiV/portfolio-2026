/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchNotionCaseStudy } from "@/lib/notionCaseStudy";
import { NotionRenderer } from "./blocks/NotionRenderer";
import { SITE_CONFIG } from "@/config";

type LoadStatus = "loading" | "loaded" | "error";

interface CaseStudyData {
  blocks: any[];
  title?: string;
}

export function CaseStudyPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <CaseStudyError />;
  }

  return <CaseStudyContent id={id} />;
}

function CaseStudyContent({ id }: { id: string }) {
  const navigate = useNavigate();

  const [status, setStatus] = useState<LoadStatus>("loading");
  const [caseStudy, setCaseStudy] = useState<CaseStudyData | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCaseStudy() {
      try {
        const data = await fetchNotionCaseStudy(id);

        if (cancelled) return;

        setCaseStudy({
          blocks: Array.isArray(data) ? data : (data.blocks ?? []),
          title: data.title,
        });

        setStatus("loaded");
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    void loadCaseStudy();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <div className="h-full overflow-y-auto">
        <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-8 md:py-8">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={13} />
            Back ·<span className="text-foreground/70">{SITE_CONFIG.name}</span>
            ·<span className="font-medium text-foreground">Projects</span>
          </button>

          <div className="space-y-6">
            <div className="h-10 w-2/3 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
            <div className="aspect-video w-full animate-pulse rounded-xl bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (status === "error" || !caseStudy) {
    return <CaseStudyError />;
  }

  return (
    <div className="h-full overflow-y-auto [transform:translateZ(0)]">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-8 md:py-8">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={13} />
          Back ·<span className="text-foreground/70">{SITE_CONFIG.name}</span>·
          <span className="font-medium text-foreground">Projects</span>
        </button>

        <main>
          {caseStudy.title && (
            <h1
              className="mb-10 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {caseStudy.title}
            </h1>
          )}

          <NotionRenderer blocks={caseStudy.blocks} />
        </main>

        <section className="mt-20 border-t pt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Finished exploring?
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Take a look at the other projects.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              View all projects
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function CaseStudyError() {
  const navigate = useNavigate();

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col px-4 py-6 md:px-8 md:py-8">
        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={13} />
          Back ·<span className="text-foreground/70">{SITE_CONFIG.name}</span>·
          <span className="font-medium text-foreground">Projects</span>
        </button>

        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-foreground">
              Case study not found
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              This project case study could not be loaded.
            </p>

            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="mt-5 inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <ArrowLeft size={14} />
              View all projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
