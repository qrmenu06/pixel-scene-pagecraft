import type { ReactNode } from "react";
import { Heart, MessageCircle, Send, Bookmark, Play, Check, ArrowRight, ShoppingBag, Mail, FileText, Bell, Table2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import heroCafe from "@/assets/hero-cafe.jpg";
import production from "@/assets/production.jpg";
import chair from "@/assets/product-chair.jpg";
import drone from "@/assets/drone-lounge.jpg";
import flatlay from "@/assets/ecommerce-flatlay.jpg";

export const images = { heroCafe, production, chair, drone, flatlay };

export function SampleBadge({ className, children = "Örnek uygulama" }: { className?: string; children?: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink shadow-sm", className)}>
      <span className="size-1.5 rounded-full bg-cyan" /> {children}
    </span>
  );
}

export function Phone({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative w-[260px] shrink-0 rounded-[2.4rem] bg-ink p-2.5 shadow-float", className)}>
      <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
      <div className="overflow-hidden rounded-[1.9rem] bg-card text-card-foreground">{children}</div>
    </div>
  );
}

export function PhoneFeed({ className }: { className?: string }) {
  return (
    <Phone className={className}>
      <div className="flex items-center gap-2 px-3 pb-2 pt-9">
        <div className="size-7 rounded-full bg-gradient-to-br from-cyan to-ink" />
        <div className="text-xs leading-tight">
          <p className="font-bold">ornek.kafe</p>
          <p className="text-muted-foreground">Çankaya, Ankara</p>
        </div>
      </div>
      <img src={heroCafe} alt="Örnek gönderi: latte servis edilirken" width={1280} height={1600} loading="lazy" className="aspect-[4/5] w-full object-cover" />
      <div className="flex items-center gap-3 px-3 py-2">
        <Heart className="size-4" /> <MessageCircle className="size-4" /> <Send className="size-4" /> <Bookmark className="ml-auto size-4" />
      </div>
      <p className="px-3 pb-4 text-[11px] leading-snug">
        <b>ornek.kafe</b> Sabahın ilk ışığı, günün ilk latte'si. Hafta içi 08.00'den itibaren sizi bekliyoruz ☕
      </p>
    </Phone>
  );
}

export function PhoneReels({ className, src = production, caption = "Mutfaktan masaya: yeni sezon tabakları" }: { className?: string; src?: string; caption?: string }) {
  return (
    <Phone className={className}>
      <div className="relative aspect-[9/17]">
        <img src={src} alt="Örnek Reels karesi" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
        <p className="absolute left-3 top-10 text-xs font-bold text-ink-foreground">Reels</p>
        <Play className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 fill-ink-foreground text-ink-foreground opacity-80" />
        <p className="absolute bottom-4 left-3 right-10 text-xs font-semibold leading-snug text-ink-foreground">{caption}</p>
      </div>
    </Phone>
  );
}

export function PhoneStory({ className }: { className?: string }) {
  return (
    <Phone className={className}>
      <div className="relative aspect-[9/17] grain-ink p-5 pt-12 text-ink-foreground">
        <div className="absolute left-3 right-3 top-8 flex gap-1">
          {[1, 0, 0].map((a, i) => <span key={i} className={cn("h-0.5 flex-1 rounded", a ? "bg-ink-foreground" : "bg-ink-foreground/30")} />)}
        </div>
        <p className="eyebrow mt-6 text-cyan">Cuma 21.00</p>
        <p className="mt-3 font-display text-3xl font-bold leading-none">Canlı akustik gecesi</p>
        <img src={drone} alt="" loading="lazy" className="mt-5 aspect-square w-full rounded-xl object-cover" />
        <p className="mt-4 text-xs text-ink-muted">Rezervasyon için profildeki bağlantı</p>
      </div>
    </Phone>
  );
}

export function Browser({ children, className, url = "ornekfirma.com" }: { children: ReactNode; className?: string; url?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border bg-card shadow-float", className)}>
      <div className="flex items-center gap-2 border-b bg-stone px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" />
        <span className="ml-3 flex-1 truncate rounded-md bg-card px-3 py-1 text-[11px] text-muted-foreground">{url}</span>
      </div>
      {children}
    </div>
  );
}

export function WebMock({ className }: { className?: string }) {
  return (
    <Browser className={className} url="ornek-mobilya.com.tr">
      <div className="grid grid-cols-[1.1fr_1fr] items-center gap-6 p-6 md:p-8">
        <div>
          <p className="eyebrow text-muted-foreground">Ofis mobilyaları</p>
          <p className="mt-3 font-display text-2xl font-bold leading-tight md:text-3xl">Çalışma alanınız için tasarlandı, Ankara'da üretildi.</p>
          <p className="mt-3 text-xs text-muted-foreground md:text-sm">Masa, sandalye ve depolama çözümleri. Projenize özel ölçülerde üretim.</p>
          <div className="mt-5 flex gap-2">
            <span className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-ink-foreground">Katalog</span>
            <span className="rounded-full border px-4 py-2 text-xs font-bold">Teklif iste</span>
          </div>
        </div>
        <img src={chair} alt="Örnek web sitesinde ürün görseli" loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
      </div>
      <div className="grid grid-cols-3 gap-3 border-t p-4 text-[11px]">
        {["Masalar", "Sandalyeler", "Depolama"].map((t) => (
          <div key={t} className="rounded-lg bg-stone p-3 font-semibold">{t} <span className="block font-normal text-muted-foreground">Ürünleri gör →</span></div>
        ))}
      </div>
    </Browser>
  );
}

export function MobileWebMock({ className }: { className?: string }) {
  return (
    <Phone className={cn("w-[200px]", className)}>
      <div className="px-4 pb-5 pt-10">
        <p className="font-display text-sm font-bold">ornek-mobilya</p>
        <img src={chair} alt="" loading="lazy" className="mt-3 aspect-square w-full rounded-lg object-cover" />
        <p className="mt-3 font-display text-lg font-bold leading-tight">Çalışma alanınız için tasarlandı.</p>
        <span className="mt-3 block rounded-full bg-ink py-2 text-center text-[11px] font-bold text-ink-foreground">Teklif iste</span>
      </div>
    </Phone>
  );
}

const calendar = [
  ["Pzt", "Ürün", "Yeni sezon tatlısı — carousel"],
  ["Sal", "Story", "Günün menüsü"],
  ["Çar", "Reels", "Mutfaktan masaya"],
  ["Per", "Gönderi", "Ekipten bir yüz"],
  ["Cum", "Duyuru", "Canlı müzik gecesi"],
  ["Cmt", "Reels", "Hafta sonu kahvaltısı"],
  ["Paz", "Story", "Müşteri anları (izinli)"],
];
export function ContentCalendar({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border bg-card p-5 shadow-float", className)}>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold">İçerik takvimi · Hafta 2</p>
        <SampleBadge className="bg-stone" />
      </div>
      <ul className="mt-4 divide-y text-sm">
        {calendar.map(([d, t, s]) => (
          <li key={d} className="grid grid-cols-[3rem_5.5rem_1fr_auto] items-center gap-2 py-2.5">
            <span className="font-bold">{d}</span>
            <span className={cn("rounded-full px-2.5 py-0.5 text-center text-[11px] font-bold", t === "Reels" ? "bg-ink text-ink-foreground" : t === "Story" ? "bg-cyan-soft" : "bg-stone")}>{t}</span>
            <span className="truncate text-muted-foreground">{s}</span>
            <Check className="size-4 text-success" aria-label="Onaylandı" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AdsMock({ className }: { className?: string }) {
  const rows = [
    { name: "A · Ürün odaklı görsel", status: "Test ediliyor" },
    { name: "B · Üretim süreci videosu", status: "Test ediliyor" },
    { name: "C · Müşteri kullanımı (UGC)", status: "Hazırlanıyor" },
  ];
  return (
    <div className={cn("rounded-xl bg-ink-2 p-5 text-ink-foreground shadow-float", className)}>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold">Kampanya: Teklif talebi</p>
        <SampleBadge />
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
        {[["Hedef", "Mesaj / form"], ["Kitle", "Ankara, 25–55"], ["Bütçe", "Size ait, ayrı"]].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-ink p-3"><dt className="text-ink-muted">{k}</dt><dd className="mt-1 font-semibold">{v}</dd></div>
        ))}
      </dl>
      <ul className="mt-4 space-y-2">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between rounded-lg border border-ink p-3 text-sm">
            <span>{r.name}</span>
            <span className="rounded-full bg-cyan/15 px-2.5 py-0.5 text-[11px] font-bold text-cyan">{r.status}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] text-ink-muted">Sonuç değerleri gerçek veriye göre raporlanır; burada örnek gösterilmez.</p>
    </div>
  );
}

export function AutomationFlow({ className, tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  const steps = [
    { icon: FileText, k: "Girdi", t: "Web sitesinden teklif formu doldurulur" },
    { icon: Table2, k: "İşlem", t: "Talep tabloya kaydedilir, sektöre göre etiketlenir" },
    { icon: Sparkles, k: "İşlem", t: "Yapay zekâ talebi tek paragrafta özetler" },
    { icon: Bell, k: "Çıktı", t: "İlgili kişiye bildirim ve hazır yanıt taslağı gider" },
  ];
  return (
    <div className={cn("rounded-xl p-5 shadow-float", tone === "ink" ? "bg-ink-2 text-ink-foreground" : "bg-card", className)}>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold">Talep → kayıt → bildirim</p>
        <SampleBadge>Örnek senaryo</SampleBadge>
      </div>
      <ol className="mt-5 space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-cyan text-ink"><s.icon className="size-4" /></span>
            <div>
              <p className={cn("eyebrow", tone === "ink" ? "text-ink-muted" : "text-muted-foreground")}>{s.k}</p>
              <p className="text-sm font-semibold">{s.t}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function BrandBoard({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      <div className="col-span-2 grid place-items-center rounded-xl surface-ink p-10">
        <p className="font-display text-5xl font-bold tracking-tighter">lumo<span className="text-cyan">.</span></p>
        <p className="mt-2 text-xs text-ink-muted">Örnek marka · logo</p>
      </div>
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <p className="eyebrow text-muted-foreground">Renkler</p>
        <div className="mt-3 flex gap-2">{["bg-ink", "bg-cyan", "bg-stone", "bg-paper border"].map((c) => <span key={c} className={cn("size-9 rounded-full", c)} />)}</div>
      </div>
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <p className="eyebrow text-muted-foreground">Tipografi</p>
        <p className="mt-2 font-display text-3xl font-bold">Aa</p>
        <p className="text-xs text-muted-foreground">Başlık · Gövde</p>
      </div>
      <div className="col-span-2 flex items-center justify-between rounded-xl bg-cyan-soft p-4">
        <div>
          <p className="text-xs font-bold">Kartvizit</p>
          <p className="font-display text-lg font-bold">Deniz Yılmaz · Kurucu</p>
          <p className="text-[11px] text-muted-foreground">Örnek isim — uygulama gösterimi</p>
        </div>
        <SampleBadge />
      </div>
    </div>
  );
}

export function StoreMock({ className }: { className?: string }) {
  return (
    <Browser className={className} url="ornek-magaza.com/urun/nemlendirici-sprey">
      <div className="grid gap-5 p-5 sm:grid-cols-[1.1fr_1fr]">
        <img src={flatlay} alt="Örnek ürün sayfası görseli" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
        <div className="text-sm">
          <p className="text-xs text-muted-foreground">Cilt bakım · Örnek ürün</p>
          <p className="mt-1 font-display text-xl font-bold leading-tight">Nemlendirici yüz spreyi 100 ml</p>
          <p className="mt-2 text-xs text-muted-foreground">Aloe vera ve yeşil çay içerir. Gün içinde makyaj üstüne uygulanabilir.</p>
          <div className="mt-3 flex gap-2 text-[11px]">{["50 ml", "100 ml"].map((v, i) => <span key={v} className={cn("rounded-full border px-3 py-1", i && "border-ink font-bold")}>{v}</span>)}</div>
          <span className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-xs font-bold text-ink-foreground"><ShoppingBag className="size-3.5" /> Sepete ekle</span>
          <ul className="mt-3 space-y-1 text-[11px] text-muted-foreground"><li>✓ Güvenli ödeme</li><li>✓ Kargo takibi</li></ul>
        </div>
      </div>
    </Browser>
  );
}

export function OrderFlow({ className }: { className?: string }) {
  const s = ["Sipariş alındı", "Ödeme onaylandı", "Kargoya verildi", "Müşteriye e-posta"];
  return (
    <div className={cn("flex flex-wrap items-center gap-2 text-xs font-semibold", className)}>
      {s.map((x, i) => (
        <span key={x} className="flex items-center gap-2">
          <span className="rounded-full bg-card px-3 py-1.5 shadow-sm">{i === 3 && <Mail className="mr-1 inline size-3" />}{x}</span>
          {i < s.length - 1 && <ArrowRight className="size-3.5 text-cyan" />}
        </span>
      ))}
    </div>
  );
}
