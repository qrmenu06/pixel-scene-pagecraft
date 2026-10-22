import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/calismalar", label: "Çalışmalar" },
  { to: "/referanslar", label: "Referanslar" },
  { to: "/paketler", label: "Paketler" },
  { to: "/hakkimizda", label: "Hakkımızda" },
] as const;

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-xl font-bold tracking-tight", className)}>
      Ventos<span className="text-cyan"> Digital</span>
    </span>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
  }, [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const close = (e: MouseEvent) => ddRef.current && !ddRef.current.contains(e.target as Node) && setSvcOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && (setSvcOpen(false), setOpen(false));
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => (document.removeEventListener("mousedown", close), document.removeEventListener("keydown", esc));
  }, []);

  const isActive = (p: string) => pathname === p || pathname.startsWith(p + "/");

  return (
    <header className={cn("sticky top-0 z-50 transition-colors duration-300", scrolled || open ? "bg-paper/90 backdrop-blur-md border-b" : "bg-transparent")}>
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-20">
        <Link to="/" aria-label="Ventos Digital ana sayfa">
          <Wordmark />
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-1 lg:flex">
          <div ref={ddRef} className="relative" onMouseEnter={() => setSvcOpen(true)} onMouseLeave={() => setSvcOpen(false)}>
            <button
              type="button"
              aria-expanded={svcOpen}
              aria-haspopup="true"
              onClick={() => setSvcOpen((v) => !v)}
              className={cn("flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-stone", isActive("/hizmetler") && "bg-stone")}
            >
              Hizmetler <ChevronDown className={cn("size-4 transition-transform", svcOpen && "rotate-180")} />
            </button>
            {svcOpen && (
              <div className="absolute left-0 top-full pt-3">
                <div className="grid w-[640px] grid-cols-[1fr_1.2fr] overflow-hidden rounded-xl border bg-card shadow-float">
                  <div className="surface-ink p-6">
                    <p className="eyebrow text-cyan">Hizmetler</p>
                    <p className="mt-3 font-display text-2xl font-semibold leading-tight">İçerik, reklam, web ve otomasyon tek ekipte.</p>
                    <Link to="/hizmetler" className="mt-6 inline-block text-sm font-semibold text-cyan underline-offset-4 hover:underline">
                      Tüm hizmetleri gör →
                    </Link>
                  </div>
                  <ul className="p-3">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          to="/hizmetler/$slug"
                          params={{ slug: s.slug }}
                          className={cn("block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-stone", pathname === `/hizmetler/${s.slug}` && "bg-stone font-semibold")}
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn("rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-stone", isActive(n.to) && "bg-stone")}
              aria-current={isActive(n.to) ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/teklif" className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-ink-foreground transition-transform hover:-translate-y-0.5 sm:inline-block">
            Teklif al
          </Link>
          <button type="button" className="rounded-full p-2 lg:hidden" aria-label={open ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t bg-paper lg:hidden">
          <nav aria-label="Mobil menü" className="container-x flex flex-col py-4">
            <Link to="/hizmetler" className="py-3 font-display text-2xl font-semibold">Hizmetler</Link>
            <ul className="mb-3 grid grid-cols-1 gap-1 border-l-2 border-cyan pl-4 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to="/hizmetler/$slug" params={{ slug: s.slug }} className="block py-2 text-sm text-muted-foreground">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className={cn("py-3 font-display text-2xl font-semibold", isActive(n.to) && "text-cyan")}>
                {n.label}
              </Link>
            ))}
            <Link to="/iletisim" className="py-3 font-display text-2xl font-semibold">İletişim</Link>
            <Link to="/teklif" className="mt-4 rounded-full bg-ink px-5 py-4 text-center font-bold text-ink-foreground">
              Teklif al
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
