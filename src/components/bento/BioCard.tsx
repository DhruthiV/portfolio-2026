import { SITE_CONFIG } from "../../config";
import { MainCard } from "./MainCard";

export function BioCard() {
  return (
    <MainCard className="gap-3">
      <h2
        className="text-sm font-semibold text-foreground"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        About
      </h2>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {SITE_CONFIG.summary}
      </p>
    </MainCard>
  );
}
