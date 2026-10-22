import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { pageHead } from "@/lib/seo";
import { PageIntro, CtaBand } from "@/components/site/Blocks";
import { ServiceHeroVisual } from "@/components/site/ServiceVisual";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hizmetler/")({
  head: () => pageHead({ path: "/hizmetler", title: "Hizmetler | Ventos Digital", description: "Sosyal medya, Meta reklamları, fotoğraf-video, web, e-ticaret, marka kimliği ve yazılım/otomasyon hizmetleri." }),
  component: ServicesPage,
});

const groups = ["İçerik ve pazarlama", "Teknoloji", "E-ticaret"] as const;

function ServicesPage() {
  return (
    <>
      <PageIntro crumbs={[{ label: "Hizmetler" }]} eyebrow="Hizmetler" title="Üç uzmanlık, tek ekip." intro="İçerik ve pazarlama, teknoloji ve e-ticaret aynı çatı altında çalışır. İhtiyacınız olanı seçin, gerekirse birleştirelim." />
      {groups.map((g, gi) => (
        <section key={g} className={cn("py-16 md:py-20", gi === 1 && "surface-stone")}>
          <div className="container-x">
            <p className="eyebrow text-muted-foreground">{g}</p>
            <div className="mt-8 space-y-16">
              {services.filter((s) => s.group === g).map((s, i) => (
                <Reveal key={s.slug} className={cn("grid items-center gap-10 lg:grid-cols-2", i % 2 && "lg:[&>*:first-child]:order-2")}>
                  <div>
                    <h2 className="display-md">{s.title}</h2>
                    <p className="mt-4 max-w-lg text-lg text-muted-foreground">{s.short}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {s.outputs.map((o) => <li key={o.title} className="rounded-full border px-3 py-1 text-sm">{o.title}</li>)}
                    </ul>
                    <Link to="/hizmetler/$slug" params={{ slug: s.slug }} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-ink-foreground">
                      Detaylar <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                  <div className="max-h-[520px] overflow-hidden"><ServiceHeroVisual slug={s.slug} /></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
