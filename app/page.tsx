import HeroCanvas from "@/components/HeroCanvas";
import TrackedLink from "@/components/TrackedLink";
import ProjectCard from "@/components/ProjectCard";
import { profile, about, projects, experience, education } from "@/lib/content";

export default function Home() {
  const consulting = projects.filter((p) => p.group === "consulting");
  const ds = projects.filter((p) => p.group === "data-science");

  return (
    <>
      {/* ── Hero ─────────────────────────────── */}
      <section className="hero" data-section="hero">
        <HeroCanvas />
        <div className="container">
          <h1>
            {profile.headline.split("*").map((part, i) =>
              i % 2 === 1 ? <em key={i}>{part}</em> : part
            )}
          </h1>
          <p className="lead">{profile.intro}</p>
          <div className="hero-actions">
            <TrackedLink
              href={`mailto:${profile.email}`}
              event="contact_click"
              params={{ channel: "email", location: "hero" }}
              className="btn"
            >
              Email me
            </TrackedLink>
            <TrackedLink
              href={profile.linkedin}
              external
              event="contact_click"
              params={{ channel: "linkedin", location: "hero" }}
              className="btn"
            >
              LinkedIn
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ── Experience ───────────────────────── */}
      <section id="experience" className="section section-alt" data-section="experience">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <div className="stats stats-top">
            {about.stats.map((st) => (
              <div key={st.value} className="stat">
                <span className="stat-value">{st.value}</span>
                <span className="stat-label">{st.label}</span>
              </div>
            ))}
          </div>
          <div className="exp-head">
            <div>
              <h3 className="exp-company">
                {experience.company}{" "}
                <span className="muted">· {experience.companyNote}</span>
              </h3>
              <p className="muted">
                {experience.location} · Clients: {experience.clients}
              </p>
            </div>
            <span className="exp-period">{experience.period}</span>
          </div>

          <ol className="timeline">
            {experience.roles.map((r) => (
              <li key={r.title}>
                <div className="role-head">
                  <span className="role-title">{r.title}</span>
                  <span className="role-period">{r.period}</span>
                </div>
                <ul className="bullets">
                  {r.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Projects ─────────────────────────── */}
      <section id="projects" className="section" data-section="projects">
        <div className="container">
          <h2 className="section-title">Projects</h2>

          <h3 className="group-title">Client Consulting Projects (through Carlson Analytics Lab)</h3>
          <div className="grid grid-2">
            {consulting.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>

          <h3 className="group-title">Selected Projects</h3>
          <div className="grid">
            {ds.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ────────────────────────── */}
      <section id="education" className="section section-alt" data-section="education">
        <div className="container">
          <h2 className="section-title">Education</h2>
          <ul className="edu edu-grid">
            {education.map((e) => (
              <li key={e.degree}>
                <strong>{e.degree}</strong>
                <span className="muted">{e.school}</span>
                <span className="muted edu-meta">{e.location} · {e.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
