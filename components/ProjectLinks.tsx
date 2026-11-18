import TrackedLink from "./TrackedLink";
import type { Project } from "@/lib/content";

const LABELS = { github: "GitHub", slides: "Slides", tableau: "Tableau" } as const;

export default function ProjectLinks({ p, large }: { p: Project; large?: boolean }) {
  const entries = (Object.keys(LABELS) as (keyof typeof LABELS)[]).filter(
    (k) => p.links[k]
  );

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className={`link-row${large ? " lg" : ""}`}>
      {entries.map((k) => (
        <TrackedLink
          key={k}
          href={p.links[k]!}
          external
          event="project_link_click"
          params={{ project_name: p.slug, link_type: k }}
          className="pill"
        >
          {LABELS[k]} ↗
        </TrackedLink>
      ))}
    </div>
  );
}
