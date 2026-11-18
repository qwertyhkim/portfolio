import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ProjectLinks from "@/components/ProjectLinks";
import { projects, profile } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.filter((p) => !p.comingSoon).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p ? `${p.title} | ${profile.name}` : profile.name };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug && !x.comingSoon);
  if (!p) notFound();

  const list = projects.filter((x) => !x.comingSoon);
  const idx = list.findIndex((x) => x.slug === p.slug);
  const next = list[(idx + 1) % list.length];

  return (
    <article className="detail" data-section={`project_${p.slug}`}>
      <div className="container narrow">
        <Link href={`/#card-${p.slug}`} className="back">
          ← All projects
        </Link>

        <div className="card-top">
            {p.award && <span className="badge">{p.award}</span>}
        </div>
        <h1 className="detail-title">{p.title}</h1>
        <p className="detail-summary">{p.summary}</p>
        {p.role && <p className="muted">{p.role}</p>}

        <div className="metric-row">
          {(p.metrics ?? [p.metric]).map((m) => (
            <div key={m.value} className="metric metric-lg">
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </div>

        <ProjectLinks p={p} large />

        <section className="detail-block">
          <h2>Context</h2>
          <p>{p.context}</p>
        </section>

        <section className="detail-block">
          <h2>Approach</h2>
          {p.steps ? (
            <ol className="steps">
              {p.steps.map((st, i) => (
                <li key={st.title} className="step">
                  <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="step-title">{st.title}</span>
                  <span className="step-text">{st.text}</span>
                </li>
              ))}
            </ol>
          ) : (
            <ul className="bullets">
              {p.approach.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          )}
        </section>

        <section className="detail-block">
          <h2>Results</h2>
          <ul className="bullets">
            {p.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        {p.images && (
          <section className="detail-block">
            <h2>Demo</h2>
            <div className="shots">
              {p.images.map((im) => (
                <figure key={im.src} className="shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={im.src} alt={im.caption} loading="lazy" />
                  <figcaption>{im.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <ul className="tags">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <Link href={`/projects/${next.slug}`} className="next-link">
          <span className="muted">Next project</span>
          <span>{next.cardTitle ?? next.title} →</span>
        </Link>
      </div>
    </article>
  );
}
