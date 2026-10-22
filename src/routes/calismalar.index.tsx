import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { filterProjects, projectFilters, publishedProjects } from "@/content/projects";
import { pageHead } from "@/lib/seo";
import { PageIntro, ProjectCard, CtaBand } from "@/components/site/Blocks";
import { cn } from "@/lib/utils";

const keys = projectFilters.map((f) => f.key) as [string, ...string[]];

export const Route = createFileRoute("/calismalar/")({
  validateSearch: z.object({ kategori: z.enum(keys).optional().catch(undefined) }),
  head: () => pageHead({ path: "/calismalar", title: "Çalışmalar | Ventos Digital", description: "Sosyal medya, reklam, fotoğraf-video, web ve e-ticaret çalışmalarımız." }),
  component: WorksPage,
});

function WorksPage() {
  const { kategori = "tumu" } = Route.useSearch();
  const list = filterProjects(publishedProjects(), kategori);
  return (
    <>
      <PageIntro crumbs={[{ label: "Çalışmalar" }]} eyebrow="Çalışmalar" title="Yaptığımız işler." intro="Ventos Digital olarak yürüttüğümüz çalışmalar ve ekip üyelerimizin önceki web projeleri. Her kartta katkımızı açıkça belirtiyoruz." />
      <section className="container-x pb-20">
        <div role="toolbar" aria-label="Kategori filtresi" className="flex flex-wrap gap-2">
          {projectFilters.map((f) => {
            const active = f.key === kategori;
            return (
              <Link key={f.key} to="/calismalar" search={f.key === "tumu" ? {} : { kategori: f.key }} resetScroll={false} aria-pressed={active}
                className={cn("rounded-full border px-5 py-2.5 text-sm font-bold transition-colors", active ? "border-ink bg-ink text-ink-foreground" : "hover:border-ink")}>
                {f.label}
              </Link>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{list.length} çalışma</p>
        {list.length ? (
          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <li key={p.slug}><ProjectCard project={p} /></li>)}
          </ul>
        ) : (
          <p className="mt-10 rounded-xl border bg-card p-10 text-center text-muted-foreground">Bu kategoride henüz yayımlanan çalışma yok.</p>
        )}
      </section>
      <CtaBand />
    </>
  );
}
