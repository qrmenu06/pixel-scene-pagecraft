import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { attributionLabel, getPublishedProject, publishedProjects } from "@/content/projects";
import { getService } from "@/content/services";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { Crumbs, CtaBand, ProjectCard, ProjectCover, SectionHead } from "@/components/site/Blocks";
import { FeaturedVideo, SocialContent } from "@/components/site/SocialContent";

export const Route = createFileRoute("/calismalar/$proje")({
  loader: ({ params }) => {
    const project = getPublishedProject(params.proje);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Çalışma bulunamadı | Ventos Digital" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.project;
    const h = pageHead({ path: `/calismalar/${params.proje}`, title: p.seo.title, description: p.seo.description, type: "article" });
    return { ...h, scripts: [breadcrumbLd([{ name: "Ana sayfa", path: "/" }, { name: "Çalışmalar", path: "/calismalar" }, { name: p.client, path: `/calismalar/${p.slug}` }])] };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  const others = publishedProjects().filter((x) => x.slug !== p.slug && x.categories.some((c) => p.categories.includes(c))).slice(0, 3);
  return (
    <>
      <section className="container-x pb-12 pt-10">
        <Crumbs items={[{ label: "Çalışmalar", to: "/calismalar" }, { label: p.client }]} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-muted-foreground">{p.sectorLabel} · {p.title}</p>
            <h1 className="display-xl mt-4">{p.client}</h1>
          </div>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div><dt className="text-muted-foreground">Hizmetler</dt><dd className="mt-1 font-semibold">{p.services.map((s) => getService(s)?.menuLabel).join(", ")}</dd></div>
            <div><dt className="text-muted-foreground">Kapsam</dt><dd className="mt-1 font-semibold">{attributionLabel(p.attribution)}</dd></div>
          </dl>
        </div>
      </section>

      {p.cover && !p.mediaPending && (
        <section className="container-x"><ProjectCover cover={p.cover} eager className="rounded-2xl" /></section>
      )}

      <section className="surface-stone mt-12 py-16 md:py-20">
        <div className="container-x grid gap-10 md:grid-cols-2 md:gap-16">
          <div><p className="eyebrow text-muted-foreground">İhtiyaç</p><p className="mt-4 font-display text-2xl font-semibold leading-snug md:text-3xl">{p.need}</p></div>
          <div><p className="eyebrow text-muted-foreground">Yaklaşımımız</p><ul className="mt-4 space-y-2 text-lg">{p.contribution.map((c) => <li key={c} className="border-b pb-2">{c}</li>)}</ul></div>
        </div>
      </section>

      <FeaturedVideo key={`fv-${p.slug}`} project={p} />
      <SocialContent key={`sc-${p.slug}`} project={p} />

      {p.gallery.length > 0 && (
        <section className="container-x py-16">
          <SectionHead eyebrow="Galeri" title="İşten kareler." />
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {p.gallery.map((m) => <img key={m.src} src={m.src} alt={m.alt} width={m.width} height={m.height} loading="lazy" className="w-full rounded-xl" />)}
          </div>
        </section>
      )}

      <section className="container-x border-t py-16">
        <SectionHead eyebrow="Yaptığımız işin kapsamı" title="Teslim ettiklerimiz." />
        <ul className="mt-8 flex flex-wrap gap-2">{p.deliverables.map((d) => <li key={d} className="rounded-full bg-stone px-4 py-2 font-semibold">{d}</li>)}</ul>
        <ul className="mt-8 flex flex-wrap gap-3">
          {p.services.map((s) => (
            <li key={s}><Link to="/hizmetler/$slug" params={{ slug: s }} className="inline-block rounded-full border border-ink px-5 py-3 font-bold hover:bg-ink hover:text-ink-foreground">{getService(s)?.title} →</Link></li>
          ))}
        </ul>
      </section>

      {others.length > 0 && (
        <section className="container-x pb-8">
          <SectionHead eyebrow="Diğer çalışmalar" title="Benzer işler." />
          <div className="mt-8 grid gap-4 md:grid-cols-3">{others.map((o) => <ProjectCard key={o.slug} project={o} />)}</div>
        </section>
      )}

      <CtaBand title="Markanız için de birlikte üretelim." search={{ hizmet: p.services[0] }} />
    </>
  );
}
