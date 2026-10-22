import { site } from "@/content/site";

/** site.siteUrl boşsa göreli adres döner; tarayıcılar bunu gerçek yayın adresine göre çözer. */
export const absUrl = (path: string) => (site.siteUrl ? site.siteUrl.replace(/\/$/, "") + path : path);

export function pageHead(opts: { path: string; title: string; description: string; type?: string; noindex?: boolean }) {
  const url = absUrl(opts.path);
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: opts.type ?? "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      ...(opts.noindex ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.path) })),
    }),
  };
}
