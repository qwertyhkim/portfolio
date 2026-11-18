import TrackedLink from "./TrackedLink";
import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer" id="contact" data-section="contact">
      <div className="container">
        <h2 className="section-title">Let&apos;s Talk</h2>
        <p className="lead">
          Always happy to talk data, decisions, and what&apos;s behind them.
        </p>
        <div className="contact-row">
          <TrackedLink
            href={`mailto:${profile.email}`}
            event="contact_click"
            params={{ channel: "email", location: "footer" }}
            className="btn"
          >
            Email me
          </TrackedLink>
          <TrackedLink
            href={profile.linkedin}
            external
            event="contact_click"
            params={{ channel: "linkedin", location: "footer" }}
            className="btn"
          >
            LinkedIn
          </TrackedLink>
          {profile.github && (
            <TrackedLink
              href={profile.github}
              external
              event="contact_click"
              params={{ channel: "github", location: "footer" }}
              className="btn"
            >
              GitHub
            </TrackedLink>
          )}
        </div>
        <p className="copyright">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
}
