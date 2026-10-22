import type { ServiceSlug } from "@/content/services";
import { AdsMock, AutomationFlow, BrandBoard, ContentCalendar, images, MobileWebMock, OrderFlow, PhoneFeed, PhoneReels, PhoneStory, SampleBadge, StoreMock, WebMock } from "./Mockups";

/** Her hizmet için farklı bir görsel kompozisyon. */
export function ServiceHeroVisual({ slug }: { slug: ServiceSlug }) {
  switch (slug) {
    case "sosyal-medya-yonetimi":
      return (
        <div className="flex items-end justify-center gap-4 overflow-x-auto pb-4">
          <PhoneStory className="hidden w-[200px] sm:block" />
          <PhoneFeed className="w-[240px]" />
          <PhoneReels className="hidden w-[200px] md:block" />
        </div>
      );
    case "reklam-yonetimi":
      return (
        <div className="relative grid gap-4 sm:grid-cols-[1fr_auto]">
          <AdsMock />
          <PhoneReels className="mx-auto w-[200px]" src={images.chair} caption="Ofisinize özel ölçüde üretim · Teklif iste" />
        </div>
      );
    case "fotograf-video-produksiyon":
      return (
        <div className="grid grid-cols-6 gap-3">
          <img src={images.production} alt="Restoranda video çekimi (stok görsel)" width={1600} height={1008} className="col-span-6 aspect-[16/9] w-full rounded-2xl object-cover" />
          <img src={images.chair} alt="Ürün çekimi örneği" loading="lazy" className="col-span-2 aspect-square w-full rounded-xl object-cover" />
          <img src={images.drone} alt="Drone çekimi örneği" loading="lazy" className="col-span-4 aspect-[2/1] h-full w-full rounded-xl object-cover" />
        </div>
      );
    case "web-tasarim":
      return (
        <div className="relative pb-10">
          <WebMock />
          <MobileWebMock className="absolute -bottom-2 right-2 hidden md:block" />
        </div>
      );
    case "e-ticaret":
      return (
        <div className="space-y-4">
          <StoreMock />
          <OrderFlow />
        </div>
      );
    case "marka-kimligi-tasarim":
      return <BrandBoard />;
    case "yazilim-yapay-zeka-otomasyon":
      return <AutomationFlow />;
  }
}

/** Hizmet sayfasının ortasında yer alan ikinci gösterim. */
export function ServiceDetailVisual({ slug }: { slug: ServiceSlug }) {
  switch (slug) {
    case "sosyal-medya-yonetimi":
      return <ContentCalendar />;
    case "reklam-yonetimi":
      return (
        <div className="rounded-xl border bg-card p-6">
          <p className="font-display text-lg font-bold">Ücret ve bütçe ayrımı</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-stone p-4"><p className="eyebrow text-muted-foreground">Ventos'a</p><p className="mt-1 font-semibold">Yönetim ücreti</p><p className="text-sm text-muted-foreground">Planlama, kurulum, kreatif ve değerlendirme.</p></div>
            <div className="rounded-lg bg-cyan-soft p-4"><p className="eyebrow text-muted-foreground">Meta'ya</p><p className="mt-1 font-semibold">Reklam bütçesi</p><p className="text-sm text-muted-foreground">Doğrudan sizin hesabınızdan harcanır.</p></div>
          </div>
        </div>
      );
    case "fotograf-video-produksiyon":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Ürün", "Beyaz fon, detay ve atmosfer kareleri"],
            ["Mekân", "İç/dış mekân, ışık ve kalabalık"],
            ["Drone", "Konumu ve büyüklüğü gösteren görüntüler"],
            ["Reels & UGC", "Dikey, kısa ve doğal videolar"],
            ["AI destekli", "Konsept/taslak görseller — gerçek çekim olarak sunulmaz"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border bg-card p-5"><p className="font-display text-lg font-bold">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
      );
    case "web-tasarim":
      return (
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between"><p className="font-display text-lg font-bold">Örnek sayfa planı</p><SampleBadge className="bg-stone" /></div>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
            {["Ana sayfa", "Hakkımızda", "Ürünler", "Ürün detayı", "Referanslar", "İletişim / teklif"].map((x) => <li key={x} className="rounded-lg bg-stone px-3 py-2 font-semibold">{x}</li>)}
          </ul>
        </div>
      );
    case "e-ticaret":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl surface-ink p-6"><p className="eyebrow text-cyan">Tek seferlik</p><p className="mt-2 font-display text-2xl font-bold">Mağaza kurulumu</p><p className="mt-2 text-sm text-ink-muted">Tema, kategoriler, ürün sayfaları, ödeme ve kargo.</p></div>
          <div className="rounded-xl bg-cyan-soft p-6"><p className="eyebrow text-muted-foreground">Aylık, isteğe bağlı</p><p className="mt-2 font-display text-2xl font-bold">Büyütme desteği</p><p className="mt-2 text-sm text-muted-foreground">Ürün içerikleri, reklamlar ve mağaza geliştirmeleri.</p></div>
        </div>
      );
    case "marka-kimligi-tasarim":
      return (
        <div className="flex flex-wrap gap-3">
          <PhoneFeed className="w-[220px]" />
          <div className="grid flex-1 place-items-center rounded-2xl surface-ink p-8 text-center"><p className="font-display text-4xl font-bold">lumo<span className="text-cyan">.</span></p><p className="mt-2 text-sm text-ink-muted">Sosyal medya şablonu uygulaması · örnek</p></div>
        </div>
      );
    case "yazilim-yapay-zeka-otomasyon":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Talep formu → kayıt", "Formdan gelen her talep tabloya düşer, ilgili kişiye bildirim gider."],
            ["Tekrarlanan işlem", "Sipariş sonrası fatura ve kargo e-postası kendiliğinden hazırlanır."],
            ["Müşteri adayı bulma", "Belirli sektördeki işletmeler listelenir, iletişim bilgileri düzenlenir."],
            ["E-posta akışı", "Teklif sonrası hatırlatma e-postaları planlı gönderilir."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border bg-card p-5"><p className="eyebrow text-muted-foreground">Örnek senaryo</p><p className="mt-1 font-display text-lg font-bold">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
      );
  }
}
