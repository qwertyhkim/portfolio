import Link from "next/link";
import { profile } from "@/lib/content";

export default function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          {profile.name}
        </Link>
        <nav className="nav-links">
          <Link href="/#experience">Experience</Link>
          <Link href="/#projects">Projects</Link>
          <Link href="/#education">Education</Link>
        </nav>
      </div>
    </header>
  );
}
