import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Minus } from "lucide-react";
import { getService } from "@/content/services";
import { publishedProjects } from "@/content/projects";
import { packages } from "@/content/packages";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { Crumbs, CtaBand, Faq, ProjectCard, SectionHead } from "@/components/site/Blocks";
import { ServiceDetailVisual, ServiceHeroVisual } from "@/components/site/ServiceVisual";
import { Reveal, WindLines } from "@/components/site/Reveal";

export const Route = createFileRoute("/hizmetler/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Hizmet bulunamadı | Ventos Digital" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.service;
    const h = pageHead({ path: `/hizmetler/${params.slug}`, title: s.seo.title, description: s.seo.description });
    return { ...h, scripts: [breadcrumbLd([{ name: "Ana sayfa", path: "/" }, { name: "Hizmetler", path: "/hizmetler" }, { name: s.title, path: `/hizmetler/${s.slug}` }])] };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  const related = publishedProjects().filter((p) => p.services.includes(s.slug)).slice(0, 3);
  const pkgs = packages.filter((p) => p.services.includes(s.slug));
  const dark = s.slug === "yazilim-yapay-zeka-otomasyon" || s.slug === "reklam-yonetimi";

  return (
    <>
      <section className={dark ? "surface-ink relative overflow-hidden" : "relative overflow-hidden"}>
        {dark && <WindLines className="text-cyan" />}
        <div className="container-x relative grid items-center gap-12 pb-16 pt-10 lg:grid-cols-[1fr_1.1fr] lg:pb-24">
          <div>
            <div className={dark ? "[&_*]:text-ink-muted" : ""}>
              <Crumbs items={[{ label: "Hizmetler", to: "/hizmetler" }, { label: s.title }]} />
            </div>
            <p className={`eyebrow mt-8 ${dark ? "text-cyan" : "text-muted-foreground"}`}>{s.title}</p>
            <h1 className="display-lg mt-4">{s.headline}</h1>
            <p className={`mt-6 max-w-xl text-lg ${dark ? "text-ink-muted" : "text-muted-foreground"}`}>{s.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/teklif" search={{ hizmet: s.slug }} className={`rounded-full px-7 py-4 font-bold ${dark ? "bg-cyan text-ink" : "bg-ink text-ink-foreground"}`}>Bu hizmet için teklif al</Link>
              <Link to="/paketler" className={`rounded-full border px-7 py-4 font-bold ${dark ? "border-ink-2" : "border-ink"}`}>Fiyatlandırma</Link>
            </div>
          </div>
          <ServiceHeroVisual slug={s.slug} />
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="Kimin için" title="Bu hizmet size uygun, eğer…" />
          <ul className="mt-8 space-y-3">
            {s.forWho.map((f) => <li key={f} className="flex gap-3 text-lg"><ArrowRight className="mt-1.5 size-4 shrink-0 text-cyan" />{f}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl surface-stone p-8 md:p-10">
          <p className="eyebrow text-muted-foreground">Çözdüğü sorun</p>
          <p className="mt-4 font-display text-2xl font-semibold leading-snug md:text-3xl">{s.problem}</p>
        </div>
      </section>

      <section className="surface-stone py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHead eyebrow="Eline geçenler" title="Somut çıktılar." />
            <dl className="mt-10 space-y-6">
              {s.outputs.map((o, i) => (
                <Reveal key={o.title} delay={i * 60} className="border-t border-border pt-5">
                  <dt className="font-display text-xl font-bold">{o.title}</dt>
                  <dd className="mt-1 text-muted-foreground">{o.text}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start"><ServiceDetailVisual slug={s.slug} /></div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow="Nasıl ilerliyoruz" title="Adım adım süreç." />
        <ol className="mt-12 grid gap-8 md:grid-cols-5">
          {s.steps.map((st, i) => (
            <Reveal as="li" key={st.title} delay={i * 80} className="border-l-2 border-cyan pl-5">
              <span className="font-display text-sm font-bold text-muted-foreground">0{i + 1}</span>
              <p className="mt-2 font-display text-lg font-bold">{st.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{st.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {related.length > 0 && (
        <section className="container-x pb-20">
          <SectionHead eyebrow="İlgili işler" title="Bu hizmetle yaptıklarımız." />
          <div className="mt-10 grid gap-4 md:grid-cols-3">{related.map((p) => <ProjectCard key={p.slug} project={p} />)}</div>
        </section>
      )}

      <section className="surface-ink py-20">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow text-cyan">Dahil olanlar</p>
            <ul className="mt-6 space-y-3">{s.included.map((x) => <li key={x} className="flex gap-3"><Check className="size-5 shrink-0 text-cyan" />{x}</li>)}</ul>
          </div>
          <div>
            <p className="eyebrow text-ink-muted">Ayrıca değerlendirilenler</p>
            <ul className="mt-6 space-y-3 text-ink-muted">{s.separate.map((x) => <li key={x} className="flex gap-3"><Minus className="size-5 shrink-0" />{x}</li>)}</ul>
          </div>
        </div>
        <div className="container-x mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink-2 pt-8">
          <p className="text-ink-muted">Fiyat kapsama göre belirlenir.{pkgs.length > 0 && <> İlgili paketler: {pkgs.map((p) => p.name).join(", ")}.</>}</p>
          <Link to="/paketler" className="font-bold text-cyan">Paketleri inceleyin →</Link>
        </div>
      </section>

      <section className="container-x grid gap-10 py-20 lg:grid-cols-[1fr_1.6fr]">
        <SectionHead eyebrow="Sık sorulanlar" title={`${s.title} hakkında`} />
        <Faq items={s.faqs} />
      </section>

      <CtaBand title="Bu hizmetle başlayalım." search={{ hizmet: s.slug }} />
    </>
  );
}
