import TrackedLink from "./TrackedLink";
import ProjectLinks from "./ProjectLinks";
import type { Project } from "@/lib/content";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <article id={`card-${p.slug}`} className={`card${p.comingSoon ? " card-soon" : ""}`}>
      {p.comingSoon && (
        <div className="card-top">
          <span className="badge badge-soon">In progress</span>
        </div>
      )}

      <h3 className="card-title">{p.cardTitle ?? p.title}</h3>

      {!p.comingSoon && p.metric && (
        <div className="metric">
          <span className="metric-value">{p.metric.value}</span>
          <span className="metric-label">{p.metric.label}</span>
        </div>
      )}
      {(p.comingSoon || !p.metric) && <p className="card-summary">{p.summary}</p>}
      {p.award && (
        <div className="card-top">
          <span className="badge">{p.award}</span>
        </div>
      )}

      <ul className="tags">
        {p.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div className="card-actions">
        {!p.comingSoon && (
          <TrackedLink
            href={`/projects/${p.slug}`}
            event="project_open"
            params={{ project_name: p.slug, location: "card" }}
            className="card-open"
          >
            View project →
          </TrackedLink>
        )}
        <ProjectLinks p={p} />
      </div>
    </article>
  );
}
