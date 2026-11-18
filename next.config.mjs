// Short links that forward to UTM-tagged URLs, so shared links stay clean
// but GA4 still records where each visit came from.
// Add a new line here for each new place you share the site.
const shortLinks = [
  { path: "/linkedin", utm: "utm_source=linkedin&utm_medium=social&utm_campaign=profile&utm_content=featured" },
  { path: "/li", utm: "utm_source=linkedin&utm_medium=social&utm_campaign=profile&utm_content=contact_info" },
  { path: "/resume", utm: "utm_source=resume&utm_medium=pdf&utm_campaign=job_apply&utm_content=header_link" },
  { path: "/apply", utm: "utm_source=job_portal&utm_medium=referral&utm_campaign=job_apply" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return shortLinks.map((l) => ({
      source: l.path,
      destination: `/?${l.utm}`,
      permanent: false, // temporary, so links can be re-pointed later
    }));
  },
};

export default nextConfig;
