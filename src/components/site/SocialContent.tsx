import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Instagram, X } from "lucide-react";
import type { Project, SocialItem } from "@/content/projects";
import { SectionHead } from "./Blocks";

const EMBED_SRC = "https://www.instagram.com/embed.js";
declare global {
  interface Window { instgrm?: { Embeds: { process: () => void } } }
}
function loadEmbedScript() {
  if (window.instgrm) { window.instgrm.Embeds.process(); return; }
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SRC}"]`);
  if (existing) { existing.addEventListener("load", () => window.instgrm?.Embeds.process(), { once: true }); return; }
  const s = document.createElement("script");
  s.src = EMBED_SRC; s.async = true;
  s.onload = () => window.instgrm?.Embeds.process();
  document.body.appendChild(s);
}

function IgLink({ href, children = "Instagram'da görüntüle" }: { href: string; children?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline">
      {children} <ArrowUpRight className="size-4" />
    </a>
  );
}

/** Resmi Instagram gömmesi; ekrana yaklaşınca yüklenir. Yüklenmezse bağlantı görünür kalır. */
function Embed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((e) => { if (e[0]?.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "400px" });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => { if (near) loadEmbedScript(); }, [near]);
  return (
    <div ref={ref} className="min-w-0 overflow-hidden rounded-xl border bg-card p-3">
      {near && (
        <blockquote className="instagram-media" data-instgrm-permalink={url} data-instgrm-version="14" style={{ margin: 0, maxWidth: "100%", minWidth: 0, width: "100%" }}>
          <IgLink href={url} />
        </blockquote>
      )}
      <div className="p-2"><IgLink href={url} /></div>
    </div>
  );
}

function Lightbox({ item, onClose }: { item: SocialItem; onClose: () => void }) {
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    btn.current?.focus();
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" aria-label={item.alt} className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4" onClick={onClose}>
      <button ref={btn} type="button" onClick={onClose} aria-label="Kapat" className="absolute right-4 top-4 rounded-full bg-card p-2 text-foreground"><X className="size-5" /></button>
      <img src={item.mediaSrc} alt={item.alt} className="max-h-[90vh] max-w-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

function MediaTile({ item, onOpen }: { item: SocialItem; onOpen: (el: HTMLElement) => void }) {
  const isVideo = item.type === "reel" || item.type === "video";
  return (
    <figure className="min-w-0">
      {isVideo ? (
        <video src={item.mediaSrc} poster={item.posterSrc} controls preload="none" playsInline className="aspect-[9/16] w-full rounded-xl bg-muted object-contain" aria-label={item.alt} />
      ) : (
        <button type="button" onClick={(e) => onOpen(e.currentTarget)} className="block w-full overflow-hidden rounded-xl bg-muted" aria-label={`Büyüt: ${item.alt}`}>
          <img src={item.mediaSrc} alt={item.alt} loading="lazy" className="aspect-square w-full object-cover" />
        </button>
      )}
      {(item.caption || item.instagramUrl) && (
        <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
          {item.caption && <span>{item.caption}</span>}
          {item.instagramUrl && <IgLink href={item.instagramUrl} />}
        </figcaption>
      )}
    </figure>
  );
}

function Group({ title, items }: { title: string; items: SocialItem[] }) {
  const [open, setOpen] = useState<SocialItem | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  if (!items.length) return null;
  const close = () => { setOpen(null); opener.current?.focus(); };
  const cols = items.length === 1 ? "max-w-md" : items.length === 2 ? "sm:grid-cols-2 lg:max-w-4xl" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className="mt-10">
      {title && <h3 className="font-display text-xl font-semibold">{title}</h3>}
      <div className={`mt-5 grid grid-cols-1 items-start gap-4 ${cols}`}>
        {items.map((it) => it.mediaSrc
          ? <MediaTile key={it.mediaSrc} item={it} onOpen={(el) => { opener.current = el; setOpen(it); }} />
          : it.instagramUrl ? <Embed key={it.instagramUrl} url={it.instagramUrl} /> : null)}
      </div>
      {open && <Lightbox item={open} onClose={close} />}
    </div>
  );
}

/** Öne çıkan video/Reels: yerel dosya varsa oynatıcı, yoksa resmi Instagram gömmesi. Veri yoksa gizli. */
export function FeaturedVideo({ project: p }: { project: Project }) {
  const v = p.featuredVideo;
  if (!v || (!v.mediaSrc && !v.instagramUrl)) return null;
  return (
    <section className="surface-ink py-16 md:py-20">
      <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_minmax(0,420px)]">
        <div>
          <p className="eyebrow text-cyan">Öne çıkan Reels</p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">{p.client} için ürettiğimiz video.</h2>
          {v.instagramUrl && <div className="mt-6"><IgLink href={v.instagramUrl} /></div>}
        </div>
        <div className="mx-auto w-full max-w-[420px] text-foreground">
          {v.mediaSrc
            ? <video src={v.mediaSrc} poster={v.posterSrc} controls preload="none" playsInline className="aspect-[9/16] w-full rounded-xl bg-muted object-contain" aria-label={v.alt} />
            : <Embed key={v.instagramUrl} url={v.instagramUrl!} />}
        </div>
      </div>
    </section>
  );
}

export function SocialContent({ project: p }: { project: Project }) {
  const featured = p.featuredVideo?.instagramUrl ?? p.featuredVideo?.mediaSrc;
  const items = [...(p.socialItems ?? [])]
    .filter((i) => (i.mediaSrc || i.instagramUrl) && (i.instagramUrl ?? i.mediaSrc) !== featured)
    .sort((a, b) => a.order - b.order);
  if (!p.instagramProfileUrl && !items.length) return null;
  const videos = items.filter((i) => i.type === "reel" || i.type === "video");
  const photos = items.filter((i) => i.type === "photo" || i.type === "post");
  const both = videos.length > 0 && photos.length > 0;
  if (videos.length && !photos.length) {
    return <ReelsCarousel eyebrow="Ürettiğimiz içerikler" title="Bu işletme için hazırladığımız Reels." items={videos.map((v) => ({ url: v.instagramUrl! })).filter((v) => v.url)} link={p.instagramProfileUrl ? { href: p.instagramProfileUrl, label: "Tümünü Instagram'da gör" } : undefined} />;
  }
  return (
    <section className="container-x py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead eyebrow="Ürettiğimiz içerikler" title={items.length ? "Bu işletme için hazırladığımız işler." : `${p.client} Instagram hesabı.`} />
        {p.instagramProfileUrl && items.length > 0 && (
          <a href={p.instagramProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold">
            <Instagram className="size-4" aria-hidden /> Tümünü Instagram'da gör <ArrowUpRight className="size-4" />
          </a>
        )}
      </div>
      <Group title={both ? "Reels / videolar" : ""} items={videos} />
      <Group title={both ? "Fotoğraflar / gönderiler" : ""} items={photos} />
      {p.instagramProfileUrl && !items.length && (
        <div className="mt-10 flex flex-col gap-4 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div className="flex min-w-0 items-center gap-4">
            <Instagram className="size-8 shrink-0" aria-hidden />
            <p className="break-all font-display text-xl font-semibold">@{p.instagramProfileUrl.replace(/\/$/, "").split("/").pop()}</p>
          </div>
          <a href={p.instagramProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-bold text-ink-foreground">
            İçerikleri Instagram'da incele <ArrowUpRight className="size-4" />
          </a>
        </div>
      )}
    </section>
  );
}

/** Resmi Instagram gömmeleriyle dönen Reels şeridi. Kaydırma, oklar ve yavaş otomatik geçiş. */
export function ReelsCarousel({ items, title, eyebrow = "Reels", link }: { items: { url: string; client?: string }[]; title: string; eyebrow?: string; link?: { href: string; label: string } | undefined }) {
  const track = useRef<HTMLDivElement>(null);
  const [hold, setHold] = useState(false);
  const step = (dir: 1 | -1) => {
    const el = track.current; if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const w = (card?.offsetWidth ?? 320) + 16;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else el.scrollBy({ left: dir * w, behavior: "smooth" });
  };
  useEffect(() => {
    if (hold || items.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => step(1), 6000);
    return () => window.clearInterval(t);
  }, [hold, items.length]);
  if (!items.length) return null;
  return (
    <section className="container-x py-16" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocusCapture={() => setHold(true)} onTouchStart={() => setHold(true)}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead eyebrow={eyebrow} title={title} />
        <div className="flex items-center gap-3">
          {link && <a href={link.href} target="_blank" rel="noopener noreferrer" className="mr-2 inline-flex items-center gap-2 font-bold"><Instagram className="size-4" aria-hidden /> {link.label} <ArrowUpRight className="size-4" /></a>}
          {items.length > 1 && <>
            <button type="button" onClick={() => step(-1)} aria-label="Önceki Reels" className="rounded-full border p-2.5 hover:border-ink"><ArrowLeft className="size-4" /></button>
            <button type="button" onClick={() => step(1)} aria-label="Sonraki Reels" className="rounded-full border p-2.5 hover:border-ink"><ArrowRight className="size-4" /></button>
          </>}
        </div>
      </div>
      <div ref={track} className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
        {items.map((it) => (
          <div key={it.url} className="w-[85%] max-w-[340px] shrink-0 snap-start sm:w-[340px]">
            {it.client && <p className="mb-2 text-sm font-semibold text-muted-foreground">{it.client}</p>}
            <Embed url={it.url} />
          </div>
        ))}
      </div>
    </section>
  );
}
