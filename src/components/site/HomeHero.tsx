import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { getPublishedProject } from "@/content/projects";
import { ProjectCover } from "./Blocks";
import { WindLines } from "./Reveal";
import { cn } from "@/lib/utils";

type Btn = { label: string; to: "/calismalar" | "/teklif" | "/hizmetler"; slug?: string; primary?: boolean };
type Slide = { name: string; tag: string; title: string; text: string; buttons: Btn[]; covers: string[]; flow?: boolean };

const slides: Slide[] = [
  { name: "Ventos", tag: "İÇERİK · REKLAM · WEB · OTOMASYON", title: "Rüzgârı arkanıza alın.", text: "Markanızın içeriklerini üretiyor, reklamlarını yönetiyor, web sitesini kuruyor ve işlerini otomasyonla kolaylaştırıyoruz.", buttons: [{ label: "Çalışmalarımızı inceleyin", to: "/calismalar", primary: true }, { label: "Birlikte çalışalım", to: "/teklif" }], covers: ["dalyy-done", "novera-ofis-mobilyalari", "unal-deutschland"] },
  { name: "İçerik", tag: "SOSYAL MEDYA · FOTOĞRAF · VİDEO", title: "Markanızın anlatılacak çok şeyi var.", text: "Ürünlerinizi, mekânınızı ve hikâyenizi fotoğraf, Reels ve tasarımlarla görünür kılıyoruz. Sosyal medya hesabınızı planlı şekilde yönetiyoruz.", buttons: [{ label: "İçerik çalışmalarını görün", to: "/calismalar", primary: true }], covers: ["palmeira-lounge", "marrakesh-garden-etlik"] },
  { name: "Reklam", tag: "META REKLAM YÖNETİMİ", title: "Doğru kişilere ulaşın.", text: "Instagram ve Facebook reklamlarınızı planlıyor, farklı içerikleri test ediyor ve kampanyalarınızı düzenli olarak iyileştiriyoruz.", buttons: [{ label: "Reklam hizmetini inceleyin", to: "/hizmetler", slug: "reklam-yonetimi", primary: true }], covers: ["novera-ofis-mobilyalari", "harun-sandalye"] },
  { name: "Dijital", tag: "WEB · E-TİCARET · OTOMASYON", title: "Dijitalde işiniz kolaylaşsın.", text: "Web sitenizi ve online mağazanızı kuruyor, tekrarlanan işleri yazılım ve otomasyonla kolaylaştırıyoruz.", buttons: [{ label: "Dijital çözümleri keşfedin", to: "/hizmetler", primary: true }, { label: "İhtiyacınızı anlatın", to: "/teklif" }], covers: ["unal-deutschland", "osmanbey-agriculture"], flow: true },
];

function Cover({ slug, eager }: { slug: string; eager: boolean }) {
  const c = getPublishedProject(slug)?.cover;
  return c ? <ProjectCover cover={c} eager={eager} className="shadow-float" /> : null;
}

function Visual({ s, first }: { s: Slide; first: boolean }) {
  const [a = "", ...rest] = s.covers;
  return (
    <div className="grid gap-3">
      <Cover slug={a} eager={first} />
      <div className="grid grid-cols-2 gap-3">
        {rest.map((r) => <Cover key={r} slug={r} eager={false} />)}
        {s.flow && (
          <div className="flex flex-col justify-center rounded-xl border bg-card p-3 text-sm sm:p-4">
            <span className="eyebrow text-muted-foreground">Örnek akış</span>
            <p className="mt-2 font-display font-semibold leading-snug">Talep → Kayıt → Bildirim</p>
          </div>
        )}
      </div>
    </div>
  );
}

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const f = () => setR(m.matches);
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return r;
}

export function HomeHero() {
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hold, setHold] = useState(false);
  const [visible, setVisible] = useState(true);
  const [tabOn, setTabOn] = useState(true);
  const touchX = useRef<number | null>(null);

  // Scroll ile VENTOS yatay hareketi
  useEffect(() => {
    const el = word.current;
    if (!el) return;
    if (reduced) { el.style.transform = ""; return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = root.current?.offsetHeight || window.innerHeight;
      const p = Math.min(Math.max(window.scrollY / h, 0), 1);
      const max = window.innerWidth < 768 ? 20 : 90;
      el.style.transform = `translate3d(${-p * max}px,0,0) scale(${1 - p * 0.04})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [reduced]);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const io = new IntersectionObserver((e) => setVisible(!!e[0]?.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    const vis = () => setTabOn(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", vis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", vis); };
  }, []);

  const auto = playing && !reduced && !hold && visible && tabOn;
  useEffect(() => {
    if (!auto) return;
    const t = window.setTimeout(() => setIdx((i) => (i + 1) % slides.length), 7000);
    return () => window.clearTimeout(t);
  }, [auto, idx]);

  const go = useCallback((i: number) => { setPlaying(false); setIdx((i + slides.length) % slides.length); }, []);

  return (
    <section ref={root} className="relative overflow-hidden" aria-roledescription="carousel" aria-label="Ventos Digital açılış">
      <WindLines className="text-ink" />
      <div className="container-x relative pt-6 md:pt-10">
        <div ref={word} className="flex items-end gap-3 will-change-transform" aria-hidden>
          <span className="font-display text-[clamp(3.5rem,21vw,15rem)] font-bold leading-[0.82] tracking-[-0.05em] md:text-[14vw]">VENTOS</span>
          <span className="eyebrow mb-2 text-muted-foreground md:mb-4 md:text-base">Digital</span>
        </div>
        <h1 className="sr-only">Ventos Digital</h1>
      </div>

      <div
        className="container-x relative pb-10 pt-8 md:pt-10"
        onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}
        onFocusCapture={() => setHold(true)} onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setHold(false); }}
        onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null; }}
        onTouchEnd={(e) => {
          const s = touchX.current; touchX.current = null;
          const x = e.changedTouches[0]?.clientX;
          if (s == null || x == null || Math.abs(x - s) < 50) return;
          go(x < s ? idx + 1 : idx - 1);
        }}
      >
        <div className="grid">
          {slides.map((s, i) => {
            const active = i === idx;
            return (
              <div
                key={s.name}
                role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${slides.length}: ${s.name}`}
                aria-hidden={!active}
                inert={!active}
                className={cn(
                  "col-start-1 row-start-1 grid items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-14",
                  !reduced && "transition-[opacity,transform] duration-[550ms] ease-out",
                  active ? "opacity-100 translate-x-0" : cn("pointer-events-none opacity-0", !reduced && (i < idx ? "-translate-x-6" : "translate-x-6")),
                )}
              >
                <div className="min-w-0">
                  <p className="eyebrow text-muted-foreground">{s.tag}</p>
                  <Heading>{s.title}</Heading>
                  <p className="mt-5 max-w-xl text-lg text-muted-foreground">{s.text}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {s.buttons.map((b) => (
                      <Link key={b.label} {...(b.slug ? { to: "/hizmetler/$slug" as const, params: { slug: b.slug } } : { to: b.to })} className={cn("group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-bold", b.primary ? "bg-ink text-ink-foreground" : "border border-ink hover:bg-ink hover:text-ink-foreground")}>
                        {b.label} {b.primary && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="min-w-0"><Visual s={s} first={i === 0} /></div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-4">
          <div className="flex flex-wrap gap-1" role="tablist" aria-label="Slaytlar">
            {slides.map((s, i) => (
              <button key={s.name} type="button" role="tab" aria-selected={i === idx} onClick={() => go(i)}
                className={cn("rounded-full px-3 py-2 text-sm font-semibold transition-colors", i === idx ? "bg-ink text-ink-foreground" : "text-muted-foreground hover:text-foreground")}>
                {String(i + 1).padStart(2, "0")} {s.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => go(idx - 1)} aria-label="Önceki slayt" className="rounded-full border p-2.5 hover:border-ink"><ArrowLeft className="size-4" /></button>
            <button type="button" onClick={() => go(idx + 1)} aria-label="Sonraki slayt" className="rounded-full border p-2.5 hover:border-ink"><ArrowRight className="size-4" /></button>
            {!reduced && (
              <button type="button" onClick={() => setPlaying((v) => !v)} aria-label={playing ? "Otomatik geçişi durdur" : "Otomatik geçişi başlat"} className="rounded-full border p-2.5 hover:border-ink">
                {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return <h2 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">{children}</h2>;
}
