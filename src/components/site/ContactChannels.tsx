import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Yalnızca doldurulmuş kanalları gösterir. Hiçbiri yoksa hiçbir şey göstermez. */
export function contactLinks() {
  const c = site.contact;
  return [
    c.email && { label: c.email, href: `mailto:${c.email}`, kind: "E-posta" },
    c.phone && { label: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}`, kind: "Telefon" },
    c.whatsapp && { label: "WhatsApp", href: `https://wa.me/${c.whatsapp}`, kind: "WhatsApp" },
    c.instagram && { label: "Instagram", href: c.instagram, kind: "Instagram" },
    c.linkedin && { label: "LinkedIn", href: c.linkedin, kind: "LinkedIn" },
  ].filter(Boolean) as { label: string; href: string; kind: string }[];
}

export function ContactChannels({ className, tone = "paper" }: { className?: string; tone?: "paper" | "ink" }) {
  const links = contactLinks();
  if (!links.length) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cn("inline-block rounded-full border px-4 py-2 text-sm font-semibold", tone === "ink" ? "border-ink-2 hover:border-cyan" : "hover:border-ink")}>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
