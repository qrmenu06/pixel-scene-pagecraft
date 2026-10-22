import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { z } from "zod";
import { services } from "@/content/services";
import { getPackage } from "@/content/packages";
import { submitQuote } from "@/lib/quotes.functions";
import { pageHead } from "@/lib/seo";
import { PageIntro } from "@/components/site/Blocks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/teklif")({
  validateSearch: z.object({ hizmet: z.string().optional().catch(undefined), paket: z.string().optional().catch(undefined) }),
  head: () => pageHead({ path: "/teklif", title: "Teklif Al | Ventos Digital", description: "Üç kısa adımda ihtiyacınızı paylaşın; Ventos Digital size özel teklif hazırlasın." }),
  component: QuotePage,
});

const UNSURE = "emin-degilim";
const field = "mt-2 w-full rounded-lg border bg-card px-4 py-3 outline-none focus:border-ink";

function QuotePage() {
  const { hizmet, paket } = Route.useSearch();
  const pkg = paket ? getPackage(paket) : undefined;
  const initial = pkg ? pkg.services : hizmet && services.some((s) => s.slug === hizmet) ? [hizmet] : [];
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ services: initial as string[], sector: "", description: "", startTime: "", name: "", business: "", email: "", phone: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "error" | "done">("idle");
  const [errMsg, setErrMsg] = useState("");
  const started = useRef(Date.now());
  const submit = useServerFn(submitQuote);
  const set = (k: keyof typeof f, v: string) => setF((x) => ({ ...x, [k]: v }));

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0 && !f.services.length) e.services = "En az bir seçim yapın.";
    if (s === 1) {
      if (!f.sector.trim()) e.sector = "Sektörünüzü yazın.";
      if (f.description.trim().length < 10) e.description = "Lütfen en az 10 karakterle anlatın.";
    }
    if (s === 2) {
      if (f.name.trim().length < 2) e.name = "Adınızı girin.";
      if (!f.email.trim() && !f.phone.trim()) e.email = "E-posta veya telefon girin.";
      if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Geçerli bir e-posta girin.";
      if (f.phone && !/^[+\d\s()-]{7,20}$/.test(f.phone)) e.phone = "Geçerli bir telefon girin.";
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const send = async () => {
    if (!validate(2)) return;
    setState("loading");
    try {
      await submit({ data: { ...f, packageSlug: pkg?.slug, startTime: f.startTime || undefined, business: f.business || undefined, elapsedMs: Date.now() - started.current } });
      setState("done");
    } catch (e) {
      setErrMsg(e instanceof Error && e.message.length < 200 ? e.message : "Talep gönderilemedi.");
      setState("error");
    }
  };

  const toggle = (slug: string) => setF((x) => ({ ...x, services: x.services.includes(slug) ? x.services.filter((s) => s !== slug) : [...x.services, slug] }));
  const Err = ({ k }: { k: string }) => (errors[k] ? <p className="mt-1 text-sm text-destructive" role="alert">{errors[k]}</p> : null);

  if (state === "done")
    return (
      <PageIntro eyebrow="Teşekkürler" title="Talebiniz bize ulaştı." intro="Bilgilerinizi kaydettik. Ekibimiz talebinizi inceleyip verdiğiniz iletişim bilgisi üzerinden size dönecek." />
    );

  return (
    <>
      <PageIntro crumbs={[{ label: "Teklif al" }]} eyebrow="Teklif al" title="Üç kısa adım." intro="İhtiyacınızı paylaşın; kapsamı birlikte netleştirip size özel teklif hazırlayalım." />
      <section className="container-x pb-24">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-6 md:p-10">
          <ol className="flex gap-2" aria-label="Adımlar">
            {["Hizmet", "İhtiyaç", "İletişim"].map((l, i) => (
              <li key={l} className={cn("flex-1 border-t-4 pt-2 text-sm font-bold", i <= step ? "border-cyan" : "border-stone text-muted-foreground")} aria-current={i === step ? "step" : undefined}>{i + 1}. {l}</li>
            ))}
          </ol>
          {pkg && <p className="mt-6 rounded-lg bg-cyan-soft px-4 py-3 text-sm">Seçilen paket: <b>{pkg.name}</b></p>}

          {step === 0 && (
            <fieldset className="mt-8">
              <legend className="font-display text-2xl font-bold">Hangi konuda destek istiyorsunuz?</legend>
              <p className="text-sm text-muted-foreground">Birden fazla seçebilirsiniz.</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {[...services.map((s) => ({ slug: s.slug, label: s.title })), { slug: UNSURE, label: "Emin değilim" }].map((o) => (
                  <label key={o.slug} className={cn("flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3", f.services.includes(o.slug) && "border-ink bg-stone")}>
                    <input type="checkbox" checked={f.services.includes(o.slug)} onChange={() => toggle(o.slug)} className="size-4 accent-ink" />
                    <span className="font-semibold">{o.label}</span>
                  </label>
                ))}
              </div>
              <Err k="services" />
            </fieldset>
          )}

          {step === 1 && (
            <div className="mt-8 space-y-5">
              <p className="font-display text-2xl font-bold">İhtiyacınızı anlatın</p>
              <div><label htmlFor="sector" className="font-semibold">Sektör</label><input id="sector" className={field} value={f.sector} onChange={(e) => set("sector", e.target.value)} maxLength={100} placeholder="Örn. kafe, mobilya üretimi" /><Err k="sector" /></div>
              <div><label htmlFor="desc" className="font-semibold">Kısa açıklama</label><textarea id="desc" rows={5} className={field} value={f.description} onChange={(e) => set("description", e.target.value)} maxLength={2000} placeholder="Ne yapmak istiyorsunuz, bugün durum ne?" /><Err k="description" /></div>
              <div><label htmlFor="start" className="font-semibold">Ne zaman başlamak istersiniz? <span className="font-normal text-muted-foreground">(isteğe bağlı)</span></label><input id="start" className={field} value={f.startTime} onChange={(e) => set("startTime", e.target.value)} maxLength={100} placeholder="Örn. önümüzdeki ay" /></div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-8 space-y-5">
              <p className="font-display text-2xl font-bold">Size nasıl ulaşalım?</p>
              <div className="grid gap-5 sm:grid-cols-2">
                <div><label htmlFor="name" className="font-semibold">Ad soyad</label><input id="name" autoComplete="name" className={field} value={f.name} onChange={(e) => set("name", e.target.value)} maxLength={100} /><Err k="name" /></div>
                <div><label htmlFor="biz" className="font-semibold">İşletme <span className="font-normal text-muted-foreground">(isteğe bağlı)</span></label><input id="biz" autoComplete="organization" className={field} value={f.business} onChange={(e) => set("business", e.target.value)} maxLength={150} /></div>
                <div><label htmlFor="email" className="font-semibold">E-posta</label><input id="email" type="email" autoComplete="email" className={field} value={f.email} onChange={(e) => set("email", e.target.value)} maxLength={255} /><Err k="email" /></div>
                <div><label htmlFor="phone" className="font-semibold">Telefon</label><input id="phone" type="tel" autoComplete="tel" className={field} value={f.phone} onChange={(e) => set("phone", e.target.value)} maxLength={20} /><Err k="phone" /></div>
              </div>
              <p className="text-sm text-muted-foreground">E-posta veya telefondan en az birini girin.</p>
              <div aria-hidden className="absolute -left-[9999px]"><label>Web sitesi<input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} /></label></div>
            </div>
          )}

          {state === "error" && (
            <div className="mt-6 rounded-lg border border-destructive px-4 py-3 text-sm" role="alert">{errMsg} Bilgileriniz korunuyor; tekrar deneyebilirsiniz.</div>
          )}

          <div className="mt-10 flex justify-between gap-3">
            {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className="rounded-full border px-6 py-3 font-bold">Geri</button> : <span />}
            {step < 2 ? (
              <button type="button" onClick={() => validate(step) && setStep(step + 1)} className="rounded-full bg-ink px-7 py-3 font-bold text-ink-foreground">Devam</button>
            ) : (
              <button type="button" onClick={send} disabled={state === "loading"} className="rounded-full bg-ink px-7 py-3 font-bold text-ink-foreground disabled:opacity-60">
                {state === "loading" ? "Gönderiliyor…" : state === "error" ? "Tekrar dene" : "Talebi gönder"}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
