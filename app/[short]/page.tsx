import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { shortLinks } from "@/lib/shortlinks";

// A real page at the short address (not a server redirect), so link previews
// such as LinkedIn keep showing the short URL. Visitors are forwarded in the
// browser to the UTM-tagged home page before analytics loads.
export const dynamicParams = false;

export function generateStaticParams() {
  return shortLinks.map((l) => ({ short: l.slug }));
}

// Point the canonical and preview URL at the short link itself, so LinkedIn
// links to /<slug> (which forwards with UTM tags) instead of the bare home page.
export async function generateMetadata({ params }: { params: Promise<{ short: string }> }): Promise<Metadata> {
  const { short } = await params;
  const url = `/${short}`;
  return {
    robots: { index: false },
    alternates: { canonical: url },
    openGraph: {
      title: "Yonghui Kim",
      description: "I look for the why behind the numbers.",
      type: "website",
      url,
      images: [{ url: "/og.png", width: 1200, height: 627, alt: "Yonghui Kim, Digital Analyst" }],
    },
  };
}

export default async function ShortLink({ params }: { params: Promise<{ short: string }> }) {
  const { short } = await params;
  const link = shortLinks.find((l) => l.slug === short);
  if (!link) notFound();
  const dest = `/?${link.utm}`;
  return (
    <section className="section">
      <div className="container">
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__skipGTM=true;location.replace(${JSON.stringify(dest)});`,
          }}
        />
        <p className="muted">
          Opening the portfolio... <a href={dest}>Continue</a>
        </p>
      </div>
    </section>
  );
}
