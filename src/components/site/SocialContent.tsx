import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Instagram, X } from "lucide-react";
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
  return (
    <div className="mt-10">
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => it.mediaSrc
          ? <MediaTile key={i} item={it} onOpen={(el) => { opener.current = el; setOpen(it); }} />
          : it.instagramUrl ? <Embed key={i} url={it.instagramUrl} /> : null)}
      </div>
      {open && <Lightbox item={open} onClose={close} />}
    </div>
  );
}

export function SocialContent({ project: p }: { project: Project }) {
  const items = [...(p.socialItems ?? [])].filter((i) => i.mediaSrc || i.instagramUrl).sort((a, b) => a.order - b.order);
  if (!p.instagramProfileUrl && !items.length) return null;
  const videos = items.filter((i) => i.type === "reel" || i.type === "video");
  const photos = items.filter((i) => i.type === "photo" || i.type === "post");
  return (
    <section className="container-x py-16">
      <SectionHead eyebrow="Ürettiğimiz içerikler" title="Bu işletme için hazırladığımız içerikler." />
      <Group title="Reels / videolar" items={videos} />
      <Group title="Fotoğraflar / gönderiler" items={photos} />
      {p.instagramProfileUrl && (
        <div className="mt-10 flex flex-col gap-4 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div className="flex min-w-0 items-center gap-4">
            <Instagram className="size-8 shrink-0" aria-hidden />
            <div className="min-w-0">
              <p className="font-display text-xl font-semibold">{p.client} Instagram hesabı</p>
              <p className="break-all text-sm text-muted-foreground">@{p.instagramProfileUrl.replace(/\/$/, "").split("/").pop()}</p>
            </div>
          </div>
          <a href={p.instagramProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-bold text-ink-foreground">
            İçerikleri Instagram'da incele <ArrowUpRight className="size-4" />
          </a>
        </div>
      )}
    </section>
  );
}
