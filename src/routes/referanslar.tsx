import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { attributionLabel, publishedProjects } from "@/content/projects";
import { getService } from "@/content/services";
import { pageHead } from "@/lib/seo";
import { PageIntro, CtaBand, ProjectCover } from "@/components/site/Blocks";

export const Route = createFileRoute("/referanslar")({
  head: () => pageHead({ path: "/referanslar", title: "Referanslar | Ventos Digital", description: "Ventos Digital'in birlikte çalıştığı markalar ve ekip üyelerimizin önceki web projeleri." }),
  component: RefsPage,
});

function RefsPage() {
  const list = publishedProjects();
  const groups = [
    { key: "ventos" as const, title: "Ventos Digital çalışmaları" },
    { key: "team" as const, title: "Ekip üyelerimizin önceki web çalışmaları" },
  ];
  return (
    <>
      <PageIntro crumbs={[{ label: "Referanslar" }]} eyebrow="Referanslar" title="Birlikte çalıştığımız markalar." intro="Her markanın yanında hangi işi yaptığımızı ve proje önizlemesini görebilirsiniz." />
      {groups.map((g, gi) => (
        <section key={g.key} className={gi ? "surface-ink py-16" : "py-4 pb-16"}>
          <div className="container-x">
            <p className={`eyebrow ${gi ? "text-cyan" : "text-muted-foreground"}`}>{g.title}</p>
            <ul className={`mt-8 divide-y border-y ${gi ? "divide-ink-2 border-ink-2" : ""}`}>
              {list.filter((p) => p.attribution === g.key).map((p) => (
                <li key={p.slug}>
                  <Link to="/calismalar/$proje" params={{ proje: p.slug }} className="group grid items-center gap-4 py-6 md:grid-cols-[180px_1.4fr_1fr_1fr_auto]">
                    {p.cover && !p.mediaPending ? <ProjectCover cover={p.cover} className="max-w-[320px] md:max-w-none" /> : <span className="hidden md:block" />}
                    <span className="font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-cyan md:text-4xl">{p.client}</span>
                    <span className={gi ? "text-ink-muted" : "text-muted-foreground"}>{p.sectorLabel}</span>
                    <span className="text-sm font-semibold">{p.services.map((s) => getService(s)?.menuLabel).join(" · ")}</span>
                    <ArrowUpRight className="hidden size-5 md:block" aria-label={attributionLabel(p.attribution)} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
