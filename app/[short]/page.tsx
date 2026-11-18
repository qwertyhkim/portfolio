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

export const metadata: Metadata = { robots: { index: false } };

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
