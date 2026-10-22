import type { ServiceSlug } from "./services";

export type Pricing =
  | { type: "custom" }
  | {
      type: "fixed" | "from";
      amount: number;
      currency: "TRY";
      period: "monthly" | "one-time";
      taxIncluded: boolean;
      setupFee?: number;
      /** Reklam bütçesi her zaman ayrıdır; burada yalnızca not tutulur. */
      adBudgetNote?: string;
    };

export type Package = {
  slug: string;
  group: "monthly" | "one-time" | "custom";
  name: string;
  forWho: string;
  included: string[];
  separate: string[];
  services: ServiceSlug[];
  pricing: Pricing;
  highlight?: boolean;
};

export const packages: Package[] = [
  {
    slug: "duzenli-icerik",
    group: "monthly",
    name: "Düzenli İçerik",
    forWho: "Hesabını düzenli ve tutarlı yönetmek isteyen işletmeler.",
    included: ["Aylık içerik takvimi", "Gönderi ve story tasarımları", "Reels kurgusu", "Metin yazımı", "Paylaşım planlaması"],
    separate: ["Reklam yönetimi", "Ek çekim günleri"],
    services: ["sosyal-medya-yonetimi"],
    pricing: { type: "custom" },
  },
  {
    slug: "icerik-ve-reklam",
    group: "monthly",
    name: "İçerik ve Reklam",
    forWho: "İçeriğini daha fazla kişiye ulaştırmak ve talep toplamak isteyenler.",
    included: ["Düzenli İçerik kapsamı", "Meta reklam kurulumu ve yönetimi", "Reklam kreatifleri", "Düzenli değerlendirme"],
    separate: ["Platform reklam bütçesi", "Ek çekim günleri"],
    services: ["sosyal-medya-yonetimi", "reklam-yonetimi"],
    pricing: { type: "custom" },
    highlight: true,
  },
  {
    slug: "markaya-ozel",
    group: "monthly",
    name: "Markaya Özel",
    forWho: "İçerik, reklam, web ve otomasyonu birlikte yürütmek isteyen markalar.",
    included: ["İhtiyaca göre birleştirilen hizmetler", "Ortak planlama", "Tek ekip ile takip"],
    separate: ["Platform reklam bütçesi", "Üçüncü parti araç ücretleri"],
    services: ["sosyal-medya-yonetimi", "reklam-yonetimi", "fotograf-video-produksiyon"],
    pricing: { type: "custom" },
  },
  {
    slug: "kurumsal-web",
    group: "one-time",
    name: "Kurumsal web",
    forWho: "Kendini anlatan, talep toplayan bir site isteyen firmalar.",
    included: ["Sayfa planı", "Özel tasarım", "Geliştirme", "İletişim formu", "Yayına alma"],
    separate: ["Alan adı ve barındırma", "Metin yazımı", "Sürekli bakım"],
    services: ["web-tasarim"],
    pricing: { type: "custom" },
  },
  {
    slug: "e-ticaret-kurulumu",
    group: "one-time",
    name: "E-ticaret kurulumu",
    forWho: "Ürünlerini online satışa açmak isteyen markalar.",
    included: ["Mağaza kurulumu", "Kategori ve ürün yapısı", "Ödeme ve kargo bağlantısı"],
    separate: ["Platform ve ödeme komisyonları", "Ürün çekimi", "Aylık içerik ve reklam desteği"],
    services: ["e-ticaret"],
    pricing: { type: "custom" },
  },
  {
    slug: "marka-kimligi",
    group: "one-time",
    name: "Marka kimliği",
    forWho: "Yeni açılan veya görünümünü yenilemek isteyen işletmeler.",
    included: ["Logo", "Renk ve tipografi", "Sosyal medya şablonları", "Kullanım kılavuzu"],
    separate: ["Baskı maliyetleri", "Marka tescili"],
    services: ["marka-kimligi-tasarim"],
    pricing: { type: "custom" },
  },
  {
    slug: "proje-bazli-cekim",
    group: "one-time",
    name: "Proje bazlı çekim",
    forWho: "Menü, katalog, web veya reklam için tek seferlik çekim ihtiyacı olanlar.",
    included: ["Çekim planı", "Fotoğraf / video çekimi", "Düzenleme ve teslim"],
    separate: ["Model, stüdyo ve ulaşım", "Drone izinleri"],
    services: ["fotograf-video-produksiyon"],
    pricing: { type: "custom" },
  },
  {
    slug: "yazilim-otomasyon",
    group: "custom",
    name: "Yazılım ve otomasyon",
    forWho: "Tekrarlanan işlerini sisteme bırakmak isteyen işletmeler.",
    included: ["İhtiyaç analizi", "Kurulum ve entegrasyon", "Test ve devir"],
    separate: ["Araç abonelikleri", "Yapay zekâ kullanım ücretleri"],
    services: ["yazilim-yapay-zeka-otomasyon"],
    pricing: { type: "custom" },
  },
];

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);

export function formatPrice(pricing: Pricing): string {
  if (pricing.type === "custom") return "Kapsama göre teklif";
  const n = new Intl.NumberFormat("tr-TR").format(pricing.amount);
  const period = pricing.period === "monthly" ? " / ay" : "";
  const tax = pricing.taxIncluded ? " (KDV dahil)" : " + KDV";
  return `${pricing.type === "from" ? "₺" + n + "'den başlayan" : "₺" + n}${period}${tax}`;
}
