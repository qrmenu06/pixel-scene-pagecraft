import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getSector } from "@/content/sectors";
import { getService } from "@/content/services";
import { publishedProjects } from "@/content/projects";
import { pageHead } from "@/lib/seo";
import { Crumbs, CtaBand, ProjectCard, SectionHead } from "@/components/site/Blocks";
import { images, ContentCalendar, PhoneFeed, StoreMock, OrderFlow, WebMock } from "@/components/site/Mockups";

export const Route = createFileRoute("/sektorler/$slug")({
  loader: ({ params }) => {
    const sector = getSector(params.slug);
    if (!sector) throw notFound();
    return { sector };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? pageHead({ path: `/sektorler/${params.slug}`, title: loaderData.sector.seo.title, description: loaderData.sector.seo.description })
      : { meta: [{ title: "Sektör bulunamadı | Ventos Digital" }, { name: "robots", content: "noindex" }] },
  component: SectorPage,
});

function SectorPage() {
  const { sector: s } = Route.useLoaderData();
  const projects = publishedProjects().filter((p) => p.sector === s.slug || (s.slug === "e-ticaret" && p.categories.includes("e-ticaret")));
  const visual =
    s.layout === "atmosphere" ? (
      <div className="relative h-[480px]"><img src={images.heroCafe} alt="Kafe atmosferi (stok görsel)" className="absolute right-0 h-full w-3/4 rounded-2xl object-cover" /><PhoneFeed className="absolute bottom-0 left-0 w-[220px]" /></div>
    ) : s.layout === "catalog" ? (
      <WebMock />
    ) : (
      <div className="space-y-4"><StoreMock /><OrderFlow /></div>
    );
  return (
    <>
      <section className="container-x grid items-center gap-12 pb-16 pt-10 lg:grid-cols-2">
        <div>
          <Crumbs items={[{ label: "Sektörler" }, { label: s.title }]} />
          <p className="eyebrow mt-8 text-muted-foreground">{s.title}</p>
          <h1 className="display-lg mt-4">{s.headline}</h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{s.intro}</p>
        </div>
        {visual}
      </section>
      <section className="surface-ink py-20">
        <div className="container-x">
          <SectionHead tone="ink" eyebrow="Neye ihtiyaç var?" title="Bu sektörde öne çıkanlar." />
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-ink-2 md:grid-cols-2 lg:grid-cols-3">
            {s.needs.map((n, i) => <li key={n.title} className="bg-ink p-7"><span className="font-display text-cyan">0{i + 1}</span><p className="mt-2 font-display text-xl font-bold">{n.title}</p><p className="mt-1 text-sm text-ink-muted">{n.text}</p></li>)}
          </ol>
        </div>
      </section>
      {s.layout === "atmosphere" && <section className="container-x py-16"><ContentCalendar className="max-w-2xl" /></section>}
      <section className="container-x py-16">
        <SectionHead eyebrow="İlgili hizmetler" title="Bu sektör için hizmetler." />
        <ul className="mt-8 flex flex-wrap gap-3">{s.services.map((x) => <li key={x}><Link to="/hizmetler/$slug" params={{ slug: x }} className="inline-block rounded-full border border-ink px-5 py-3 font-bold">{getService(x)?.title} →</Link></li>)}</ul>
        {projects.length > 0 && <div className="mt-12 grid gap-4 md:grid-cols-3">{projects.slice(0, 3).map((p) => <ProjectCard key={p.slug} project={p} />)}</div>}
      </section>
      <CtaBand search={{ hizmet: s.services[0] }} />
    </>
  );
}
