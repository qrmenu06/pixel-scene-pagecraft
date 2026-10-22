import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";
import { packages, formatPrice, type Package } from "@/content/packages";
import { pageHead } from "@/lib/seo";
import { PageIntro, CtaBand, Faq, SectionHead } from "@/components/site/Blocks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/paketler")({
  head: () => pageHead({ path: "/paketler", title: "Paketler ve Fiyatlandırma | Ventos Digital", description: "Aylık içerik ve reklam paketleri, tek seferlik web, e-ticaret, marka kimliği ve çekim projeleri. Kapsama göre teklif." }),
  component: PackagesPage,
});

function PackageCol({ p, dark }: { p: Package; dark?: boolean }) {
  return (
    <div className={cn("flex flex-col p-7 md:p-8", dark ? "bg-ink text-ink-foreground" : "bg-card", p.highlight && !dark && "ring-2 ring-cyan")}>
      {p.highlight && <span className="mb-3 self-start rounded-full bg-cyan px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">Sık tercih edilen kapsam</span>}
      <h3 className="font-display text-2xl font-bold">{p.name}</h3>
      <p className={cn("mt-2 text-sm", dark ? "text-ink-muted" : "text-muted-foreground")}>{p.forWho}</p>
      <p className="mt-6 font-display text-xl font-semibold">{formatPrice(p.pricing)}</p>
      <p className="eyebrow mt-6">Dahil</p>
      <ul className="mt-3 space-y-2 text-sm">{p.included.map((x) => <li key={x} className="flex gap-2"><Check className="size-4 shrink-0 text-cyan" />{x}</li>)}</ul>
      <p className="eyebrow mt-6">Ayrıca fiyatlanır</p>
      <ul className={cn("mt-3 space-y-2 text-sm", dark ? "text-ink-muted" : "text-muted-foreground")}>{p.separate.map((x) => <li key={x} className="flex gap-2"><Minus className="size-4 shrink-0" />{x}</li>)}</ul>
      <Link to="/teklif" search={{ paket: p.slug }} className={cn("mt-8 rounded-full py-3.5 text-center font-bold", dark ? "bg-cyan text-ink" : "bg-ink text-ink-foreground")}>Bu paketle teklif al</Link>
    </div>
  );
}

function PackagesPage() {
  return (
    <>
      <PageIntro crumbs={[{ label: "Paketler" }]} eyebrow="Paketler" title="Kapsamı netleştirelim, fiyatı ona göre belirleyelim." intro="Her işletmenin ihtiyacı farklı olduğu için ücretleri kapsam görüşmesinden sonra yazılı teklifle paylaşıyoruz. Reklam bütçesi her zaman yönetim ücretinden ayrıdır." />
      <section className="container-x pb-16">
        <SectionHead eyebrow="Aylık hizmetler" title="Düzenli yürüyen işler." />
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
          {packages.filter((p) => p.group === "monthly").map((p) => <PackageCol key={p.slug} p={p} />)}
        </div>
      </section>
      <section className="surface-stone py-16">
        <div className="container-x">
          <SectionHead eyebrow="Tek seferlik projeler" title="Başı ve sonu belli işler." />
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {packages.filter((p) => p.group === "one-time").map((p) => <PackageCol key={p.slug} p={p} />)}
          </div>
        </div>
      </section>
      <section className="container-x py-16">
        <div className="grid gap-px overflow-hidden rounded-2xl md:grid-cols-[1fr_1.2fr]">
          {packages.filter((p) => p.group === "custom").map((p) => <PackageCol key={p.slug} p={p} dark />)}
          <div className="surface-ink border-l border-ink-2 p-8">
            <p className="eyebrow text-cyan">Yazılım ve otomasyon</p>
            <p className="mt-4 font-display text-2xl font-semibold">Her iş akışı farklıdır. Önce bugün işin nasıl yapıldığını dinliyor, ardından kapsam ve özel teklif hazırlıyoruz.</p>
          </div>
        </div>
      </section>
      <section className="container-x grid gap-10 pb-16 lg:grid-cols-[1fr_1.6fr]">
        <SectionHead eyebrow="Sık sorulanlar" title="Fiyatlandırma" />
        <Faq items={[
          { q: "Neden fiyat listesi yok?", a: "Gönderi sayısı, çekim günü, reklam hedefi ve sayfa sayısı işletmeden işletmeye değiştiği için kapsamı netleştirdikten sonra yazılı teklif veriyoruz." },
          { q: "Reklam bütçesi pakete dahil mi?", a: "Hayır. Meta'ya ödenen reklam bütçesi ayrıdır ve doğrudan sizin hesabınızdan harcanır." },
          { q: "Paketleri birleştirebilir miyim?", a: "Evet. Markaya Özel kapsamında ihtiyacınız olan hizmetleri birleştiriyoruz." },
        ]} />
      </section>
      <CtaBand />
    </>
  );
}
