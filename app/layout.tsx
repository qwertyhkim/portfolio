import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionTracker from "@/components/SectionTracker";
import { GTMScript, GTMNoScript } from "@/components/GTM";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://yonghui-kim.vercel.app"),
  title: `${profile.name} | ${profile.role}`,
  description: profile.intro,
  // Link previews (iMessage, LinkedIn, Slack) read these tags
  openGraph: {
    title: profile.name,
    description: profile.headline.replace(/\*/g, ""),
    type: "website",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 627, alt: "Yonghui Kim, Digital Analyst" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
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
