import { Link } from "@tanstack/react-router";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";
import { site } from "@/content/site";
import { Wordmark } from "./SiteHeader";
import { WindLines } from "./Reveal";
import { ContactChannels } from "./ContactChannels";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden surface-ink">
      <WindLines className="text-cyan" />
      <div className="container-x relative py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark className="text-3xl" />
            <p className="mt-4 max-w-sm text-ink-muted">{site.tagline} {site.city} merkezli içerik, reklam, web, e-ticaret ve otomasyon ekibi.</p>
            <ContactChannels className="mt-6" tone="ink" />
          </div>
          <div>
            <p className="eyebrow text-cyan">Hizmetler</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {services.map((s) => (
                <li key={s.slug}><Link to="/hizmetler/$slug" params={{ slug: s.slug }} className="hover:text-ink-foreground">{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-cyan">Sektörler</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {sectors.map((s) => (
                <li key={s.slug}><Link to="/sektorler/$slug" params={{ slug: s.slug }} className="hover:text-ink-foreground">{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-cyan">Ventos</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              <li><Link to="/calismalar" className="hover:text-ink-foreground">Çalışmalar</Link></li>
              <li><Link to="/referanslar" className="hover:text-ink-foreground">Referanslar</Link></li>
              <li><Link to="/paketler" className="hover:text-ink-foreground">Paketler</Link></li>
              <li><Link to="/hakkimizda" className="hover:text-ink-foreground">Hakkımızda</Link></li>
              <li><Link to="/iletisim" className="hover:text-ink-foreground">İletişim</Link></li>
              <li><Link to="/teklif" className="hover:text-ink-foreground">Teklif al</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-20 font-display text-[clamp(3rem,13vw,12rem)] font-bold leading-none tracking-tighter text-ink-2 select-none" aria-hidden>
          ventos
        </p>
        <p className="mt-6 text-xs text-ink-muted">© {new Date().getFullYear()} Ventos Digital</p>
      </div>
    </footer>
  );
}
