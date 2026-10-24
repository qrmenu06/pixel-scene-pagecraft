import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { pageHead } from "@/lib/seo";
import { services } from "@/content/services";
import { publishedProjects } from "@/content/projects";
import { sectors } from "@/content/sectors";
import { packages, formatPrice } from "@/content/packages";
import { Reveal, WindLines } from "@/components/site/Reveal";
import { ProjectCard, CtaBand, SectionHead } from "@/components/site/Blocks";
import { images, PhoneFeed, PhoneReels, WebMock, SampleBadge } from "@/components/site/Mockups";
import { HomeHero } from "@/components/site/HomeHero";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      path: "/",
      title: "Ventos Digital — İşinizi görünür kılan içerik ve dijital çözümler",
      description: "Ankara merkezli Ventos Digital; sosyal medya içerikleri, Meta reklamları, web siteleri, online mağazalar ve iş akışı otomasyonları hazırlar.",
    }),
  component: Index,
});

const needs = [
  { q: "Hesabım düzenli yönetilsin.", slug: "sosyal-medya-yonetimi" },
  { q: "Daha fazla kişiye ulaşayım.", slug: "reklam-yonetimi" },
  { q: "Ürünlerim daha iyi görünsün.", slug: "fotograf-video-produksiyon" },
  { q: "Web sitesi veya online mağaza kurayım.", slug: "web-tasarim" },
  { q: "Tekrarlanan işlerim kolaylaşsın.", slug: "yazilim-yapay-zeka-otomasyon" },
] as const;

const model = [
  { k: "Çekim", t: "Ürün ve mekân fotoğraf/video" },
  { k: "İçerik", t: "Gönderi, Reels, story" },
  { k: "Reklam", t: "Doğru kitleye ulaştırma" },
  { k: "Web / mağaza", t: "İlgilenen kişinin geldiği yer" },
  { k: "Talep takibi", t: "Formdan gelenin kaybolmaması" },
];

function Index() {
  const [motionOff, setMotionOff] = useState(false);
  const projects = publishedProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const clients = projects.map((p) => p.client);

  return (
    <div className={cn(motionOff && "motion-off")}>
      {/* A. Açılış: VENTOS + 4 slayt */}
      <HomeHero />

      {/* B. Referans bandı */}
      <section aria-label="Çalıştığımız markalar" className="border-y bg-card py-6">
        <div className="flex overflow-hidden">
          <ul className="flex shrink-0 animate-marquee items-center gap-14 pr-14">
            {[...clients, ...clients].map((c, i) => (
              <li key={i} className="whitespace-nowrap font-display text-2xl font-semibold text-muted-foreground" aria-hidden={i >= clients.length}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="container-x mt-3 flex justify-end">
          <button type="button" onClick={() => setMotionOff((v) => !v)} className="text-xs font-semibold text-muted-foreground underline underline-offset-4">
            {motionOff ? "Hareketi başlat" : "Hareketi durdur"}
          </button>
        </div>
      </section>

      {/* C. Seçili işler */}
      <section className="container-x py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Seçili işler" title="Gerçek markalar, gerçek üretim." />
          <Link to="/calismalar" className="inline-flex items-center gap-2 font-bold">Tüm çalışmalar <ArrowUpRight className="size-4" /></Link>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80} className={cn(i === 0 ? "md:col-span-4 md:row-span-2" : i === 1 ? "md:col-span-2" : "md:col-span-2", i === 3 && "md:col-span-6 lg:col-span-2")}>
              <ProjectCard project={p} size={i === 0 ? "lg" : "md"} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* D. İhtiyaca göre */}
      <section className="surface-ink relative overflow-hidden py-20 md:py-28">
        <WindLines className="text-cyan" />
        <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHead tone="ink" eyebrow="Nereden başlamalı?" title="Size en yakın cümleyi seçin." text="Pazarlama ya da yazılım terimlerini bilmeniz gerekmiyor. İhtiyacınızdan başlayın, doğru hizmete götürelim." />
          <ul className="divide-y divide-ink-2 border-y border-ink-2">
            {needs.map((n) => (
              <li key={n.q}>
                <Link to="/hizmetler/$slug" params={{ slug: n.slug }} className="group flex items-center justify-between gap-6 py-6">
                  <span className="font-display text-2xl font-semibold transition-colors group-hover:text-cyan md:text-4xl">“{n.q}”</span>
                  <ArrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-2" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* E. Hizmet özeti */}
      <section className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead eyebrow="Hizmetler" title="Ne yapıyoruz, elinize ne geçiyor?" />
            <div className="mt-10 hidden gap-4 lg:flex">
              <PhoneReels className="w-[200px]" />
              <img src={images.chair} alt="Stüdyo ürün çekimi örneği" loading="lazy" className="mt-16 h-[300px] w-[200px] rounded-2xl object-cover" />
            </div>
          </div>
          <ol>
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} className="border-t py-7 last:border-b">
                <Link to="/hizmetler/$slug" params={{ slug: s.slug }} className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4">
                  <span className="font-display text-sm font-bold text-muted-foreground">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold md:text-3xl">{s.title}</h3>
                    <p className="mt-2 max-w-xl text-muted-foreground">{s.short}</p>
                  </div>
                  <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* F. Bağlantılı çalışma modeli */}
      <section className="surface-stone py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead eyebrow="Birbirine bağlı çalışma" title="Bir işin çıktısı, bir sonrakinin rüzgârı olur." text="Çekimden talep takibine kadar her adım bir sonrakini besler. Aşağıdaki akış, işlerin nasıl bağlandığını gösteren örnek bir modeldir." />
            <SampleBadge>Örnek model</SampleBadge>
          </div>
          <div className="relative mt-14">
            <svg aria-hidden className="absolute left-0 top-8 hidden h-12 w-full md:block" viewBox="0 0 1000 40" preserveAspectRatio="none">
              <path d="M0 20 C 150 0, 250 40, 400 20 S 700 0, 1000 20" stroke="var(--cyan)" strokeWidth="2" fill="none" strokeDasharray="6 8" />
            </svg>
            <ol className="relative grid gap-6 md:grid-cols-5">
              {model.map((m, i) => (
                <Reveal as="li" key={m.k} delay={i * 120}>
                  <span className="grid size-16 place-items-center rounded-full bg-ink font-display text-xl font-bold text-ink-foreground">{i + 1}</span>
                  <p className="mt-5 font-display text-xl font-bold">{m.k}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.t}</p>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="mt-16 grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
            <img src={images.production} alt="Restoranda video çekimi yapan bir içerik üreticisi (stok görsel)" loading="lazy" width={1600} height={1008} className="aspect-[16/10] w-full rounded-2xl object-cover" />
            <WebMock />
          </div>
        </div>
      </section>

      {/* G. Süreç ve sektörler */}
      <section className="container-x grid gap-16 py-20 md:py-28 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="Nasıl çalışıyoruz" title="Dört adımda başlıyoruz." />
          <ol className="mt-10 space-y-6">
            {[
              ["Tanışma", "İşinizi, hedefinizi ve bugünkü durumu dinliyoruz."],
              ["Kapsam", "Neye ihtiyacınız olduğunu ve neyin gerekmediğini birlikte netleştiriyoruz."],
              ["Teklif", "Kapsamı, takvimi ve ücretleri yazılı olarak sunuyoruz."],
              ["Üretim", "Planlı ilerliyor, her adımda onayınızı alıyoruz."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-5">
                <span className="font-display text-4xl font-bold text-cyan">{i + 1}</span>
                <div><p className="font-display text-xl font-bold">{t}</p><p className="text-muted-foreground">{d}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <SectionHead eyebrow="Sektörler" title="Her işin anlatılacak farklı bir yanı var." />
          <ul className="mt-10 space-y-3">
            {sectors.map((s) => (
              <li key={s.slug}>
                <Link to="/sektorler/$slug" params={{ slug: s.slug }} className="group flex items-center justify-between rounded-xl border bg-card px-6 py-5 transition-colors hover:border-ink">
                  <div><p className="font-display text-xl font-bold">{s.title}</p><p className="text-sm text-muted-foreground">{s.headline}</p></div>
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* H. Paket önizleme */}
      <section className="surface-ink py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead tone="ink" eyebrow="Paketler" title="Aylık hizmetler, tek seferlik projeler." text="Ücretler kapsama göre belirlenir. Reklam bütçesi her zaman yönetim ücretinden ayrıdır." />
            <Link to="/paketler" className="inline-flex items-center gap-2 font-bold text-cyan">Paketleri karşılaştır <ArrowUpRight className="size-4" /></Link>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-ink-2 md:grid-cols-3">
            {packages.filter((p) => p.group === "monthly").map((p) => (
              <div key={p.slug} className="bg-ink p-8">
                <p className="font-display text-2xl font-bold">{p.name}</p>
                <p className="mt-2 text-sm text-ink-muted">{p.forWho}</p>
                <p className="mt-8 font-semibold text-cyan">{formatPrice(p.pricing)}</p>
                <Link to="/teklif" search={{ paket: p.slug }} className="mt-6 inline-block rounded-full border border-ink-2 px-5 py-2.5 text-sm font-bold hover:border-cyan">Bu paketle teklif al</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* I. Ekip + CTA */}
      <section className="container-x grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2">
        <img src={images.drone} alt="Akşam ışıklarıyla bir bahçe mekânının havadan görünümü (stok görsel)" loading="lazy" width={1600} height={1008} className="aspect-[4/3] w-full rounded-2xl object-cover" />
        <div>
          <SectionHead eyebrow="Ekip yaklaşımı" title="İçerik, teknoloji ve e-ticaret aynı masada." text="Çekimi yapan, reklamı kuran ve siteyi geliştiren kişiler birlikte çalışır. Bir işi parçalara bölüp farklı firmalara dağıtmak zorunda kalmazsınız." />
          <Link to="/hakkimizda" className="mt-8 inline-flex items-center gap-2 font-bold">Bizi tanıyın <ArrowRight className="size-4" /></Link>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
