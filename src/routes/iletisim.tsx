import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { site } from "@/content/site";
import { PageIntro } from "@/components/site/Blocks";
import { ContactChannels, contactLinks } from "@/components/site/ContactChannels";
import { WindLines } from "@/components/site/Reveal";

export const Route = createFileRoute("/iletisim")({
  head: () => pageHead({ path: "/iletisim", title: "İletişim | Ventos Digital", description: "Ventos Digital ile iletişime geçin veya kısa teklif formunu doldurun." }),
  component: ContactPage,
});

function ContactPage() {
  const hasChannels = contactLinks().length > 0;
  return (
    <>
      <PageIntro crumbs={[{ label: "İletişim" }]} eyebrow="İletişim" title="Bir cümleyle başlayın, gerisini konuşalım." intro={`${site.city} merkezliyiz; Türkiye genelinde çalışıyoruz.`} />
      <section className="container-x grid gap-6 pb-24 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl grain-ink p-8 text-ink-foreground md:p-12">
          <WindLines className="text-cyan" />
          <div className="relative">
            <p className="eyebrow text-cyan">En hızlı yol</p>
            <h2 className="display-md mt-3">Teklif formu</h2>
            <p className="mt-4 text-ink-muted">Üç kısa adım: hizmet, ihtiyaç ve iletişim bilgisi. Talebiniz kaydedilir ve ekibimiz size döner.</p>
            <Link to="/teklif" className="mt-8 inline-block rounded-full bg-cyan px-7 py-4 font-bold text-ink">Teklif formunu aç</Link>
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-8 md:p-12">
          <p className="eyebrow text-muted-foreground">Doğrudan iletişim</p>
          {hasChannels ? (
            <ContactChannels className="mt-6" />
          ) : (
            <p className="mt-4 text-muted-foreground">İletişim kanallarımız yakında burada olacak. Şimdilik teklif formu üzerinden bize ulaşabilirsiniz.</p>
          )}
          {site.contact.address && <p className="mt-6">{site.contact.address}</p>}
        </div>
      </section>
    </>
  );
}
