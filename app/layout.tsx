import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionTracker from "@/components/SectionTracker";
import { GTMScript, GTMNoScript } from "@/components/GTM";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description: profile.intro,
  // Link previews (iMessage, LinkedIn, Slack) read these tags
  openGraph: {
    title: profile.name,
    description: profile.headline.replace(/\*/g, ""),
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <GTMScript />
      </head>
      <body>
        <GTMNoScript />
        <Nav />
        <main>{children}</main>
        <Footer />
        <SectionTracker />
      </body>
    </html>
  );
}
