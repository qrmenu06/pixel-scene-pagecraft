import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageIntro, CtaBand, SectionHead } from "@/components/site/Blocks";
import { images, AutomationFlow, PhoneReels, StoreMock } from "@/components/site/Mockups";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/hakkimizda")({
  head: () => pageHead({ path: "/hakkimizda", title: "Hakkımızda | Ventos Digital", description: "Ankara merkezli Ventos Digital; içerik ve pazarlama, teknoloji ve e-ticaret uzmanlıklarını tek ekipte birleştirir." }),
  component: AboutPage,
});

const pillars = [
  { title: "İçerik ve pazarlama", text: "Sosyal medya yönetimi, içerik stratejisi, Meta reklamları, kreatif tasarım, fotoğraf, video, drone, Reels ve UGC.", visual: <PhoneReels className="mx-auto w-[220px]" /> },
  { title: "Teknoloji", text: "Kurumsal web siteleri, özel yazılım, yapay zekâ uygulamaları, iş akışı otomasyonları, talep takibi ve araç entegrasyonları.", visual: <AutomationFlow tone="paper" /> },
  { title: "E-ticaret", text: "Online mağaza kurulumu, ürün sunumu, içerik ve reklam desteği, mağazanın geliştirilmesi.", visual: <StoreMock /> },
];

function AboutPage() {
  return (
    <>
      <PageIntro crumbs={[{ label: "Hakkımızda" }]} eyebrow="Hakkımızda" title="Rüzgârı arkanıza almanız için." intro="Ventos Digital, Ankara merkezli bir ekip. İçerik üreten, reklam yöneten, site ve mağaza kuran, işleri otomatikleştiren kişileri aynı masada topluyoruz." />
      <section className="container-x pb-16">
        <img src={images.production} alt="İçerik çekimi sırasında bir an (stok görsel)" width={1600} height={1008} className="aspect-[21/9] w-full rounded-2xl object-cover" />
      </section>
      {pillars.map((p, i) => (
        <section key={p.title} className={i === 1 ? "surface-stone py-20" : "py-20"}>
          <Reveal className={`container-x grid items-center gap-12 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <p className="eyebrow text-muted-foreground">0{i + 1}</p>
              <h2 className="display-md mt-3">{p.title}</h2>
              <p className="mt-4 max-w-lg text-lg text-muted-foreground">{p.text}</p>
            </div>
            <div>{p.visual}</div>
          </Reveal>
        </section>
      ))}
      <section className="surface-ink py-20">
        <div className="container-x">
          <SectionHead tone="ink" eyebrow="Birlikte nasıl çalışır?" title="Bir çekim; gönderiye, reklama, ürün sayfasına ve talep formuna dönüşür." text="Aynı ekip çalıştığı için içeriği bir kez planlar, farklı yerlerde doğru biçimde kullanırız. Sizin için tek muhatap, tek takvim demektir." />
          <Link to="/hizmetler" className="mt-8 inline-block font-bold text-cyan">Hizmetleri inceleyin →</Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
