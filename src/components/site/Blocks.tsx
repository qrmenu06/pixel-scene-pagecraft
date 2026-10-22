import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";
import { attributionLabel } from "@/content/projects";
import { getService } from "@/content/services";

export function Crumbs({ items }: { items: { label: string; to?: string; params?: Record<string, string> }[] }) {
  return (
    <nav aria-label="Sayfa yolu" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link to="/" className="hover:text-foreground">Ana sayfa</Link></li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span aria-hidden>/</span>
            {it.to ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <Link to={it.to as any} params={it.params as any} className="hover:text-foreground">{it.label}</Link>
            ) : (
              <span aria-current="page" className="text-foreground">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageIntro({ eyebrow, title, intro, crumbs, children, className }: { eyebrow: string; title: ReactNode; intro?: string; crumbs?: Parameters<typeof Crumbs>[0]["items"]; children?: ReactNode; className?: string }) {
  return (
    <section className={cn("container-x pb-14 pt-10 md:pb-20 md:pt-14", className)}>
      {crumbs && <Crumbs items={crumbs} />}
      <p className="eyebrow mt-8 text-muted-foreground">{eyebrow}</p>
      <h1 className="display-lg mt-4 max-w-4xl">{title}</h1>
      {intro && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
      {children}
    </section>
  );
}

export function ProjectCard({ project, size = "md" }: { project: Project; size?: "md" | "lg" }) {
  const cover = project.cover;
  return (
    <Link to="/calismalar/$proje" params={{ proje: project.slug }} className="group block h-full">
      {cover && !project.mediaPending ? (
        <div className="overflow-hidden rounded-xl">
          <img src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
      ) : null}
      <div className={cn("flex h-full flex-col justify-between gap-8 rounded-xl border bg-card p-6 transition-colors group-hover:border-ink", size === "lg" && "md:p-8", cover && !project.mediaPending && "mt-3 h-auto")}>
        <div className="flex items-start justify-between gap-4">
          <span className="eyebrow text-muted-foreground">{project.sectorLabel}</span>
          <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <div>
          <p className={cn("font-display font-bold leading-none tracking-tight", size === "lg" ? "text-4xl md:text-5xl" : "text-3xl")}>{project.client}</p>
          <p className="mt-3 text-sm text-muted-foreground">{project.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.services.map((s) => (
              <li key={s} className="rounded-full bg-stone px-3 py-1 text-xs font-semibold">{getService(s)?.menuLabel}</li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{attributionLabel(project.attribution)}</p>
        </div>
      </div>
    </Link>
  );
}

export function Faq({ items, className }: { items: { q: string; a: string }[]; className?: string }) {
  return (
    <div className={cn("divide-y border-y", className)}>
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-semibold">
            {f.q}
            <Plus className="size-5 shrink-0 transition-transform group-open:rotate-45" />
          </summary>
          <p className="mt-3 max-w-2xl text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ title = "İhtiyacınızı konuşalım.", text = "Birkaç soruyu yanıtlayın, kapsamı birlikte netleştirip size özel teklif hazırlayalım.", search }: { title?: string; text?: string; search?: { hizmet?: string; paket?: string } }) {
  return (
    <section className="container-x py-16 md:py-24">
      <div className="relative overflow-hidden rounded-2xl grain-ink px-6 py-14 text-ink-foreground md:px-14 md:py-20">
        <div className="grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow text-cyan">Rüzgârı arkanıza alın</p>
            <h2 className="display-lg mt-4">{title}</h2>
            <p className="mt-5 max-w-xl text-ink-muted">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/teklif" search={search ?? {}} className="rounded-full bg-cyan px-7 py-4 font-bold text-ink transition-transform hover:-translate-y-0.5">Teklif al</Link>
            <Link to="/iletisim" className="rounded-full border border-ink-2 px-7 py-4 font-bold hover:border-cyan">İletişim</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, text, className, tone }: { eyebrow: string; title: ReactNode; text?: string; className?: string; tone?: "ink" }) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className={cn("eyebrow", tone === "ink" ? "text-cyan" : "text-muted-foreground")}>{eyebrow}</p>
      <h2 className="display-md mt-3">{title}</h2>
      {text && <p className={cn("mt-4 text-lg", tone === "ink" ? "text-ink-muted" : "text-muted-foreground")}>{text}</p>}
    </div>
  );
}
