import type { ServiceSlug } from "./services";

export type Sector = {
  slug: "kafe-restoran" | "mobilya-uretim" | "e-ticaret";
  title: string;
  headline: string;
  intro: string;
  needs: { title: string; text: string }[];
  services: ServiceSlug[];
  layout: "atmosphere" | "catalog" | "store";
  seo: { title: string; description: string };
};

export const sectors: Sector[] = [
  {
    slug: "kafe-restoran",
    title: "Kafe & restoran",
    headline: "Masaya gelmeden önce, ekranda tadılsın.",
    intro: "Ürün, atmosfer ve menüyü düzenli içeriklerle gösteriyor; yakın çevrenizdeki insanların sizi keşfetmesini kolaylaştırıyoruz.",
    needs: [
      { title: "Ürün", text: "Tabak, içecek ve tatlıları iştah açan karelerle." },
      { title: "Atmosfer", text: "Mekânın ışığı, sesi, kalabalığı; insanların neden geldiği." },
      { title: "Menü", text: "Yeni ürünler, sezon menüleri ve fiyat duyuruları." },
      { title: "Düzenli içerik", text: "Her hafta aynı kalitede gönderi, story ve Reels." },
      { title: "Yerel görünürlük", text: "Yakın çevreye yönelik reklam ve konum odaklı içerik." },
    ],
    services: ["sosyal-medya-yonetimi", "fotograf-video-produksiyon", "reklam-yonetimi"],
    layout: "atmosphere",
    seo: { title: "Kafe ve Restoranlar için Sosyal Medya | Ventos Digital", description: "Ürün, atmosfer ve menü içerikleri, düzenli paylaşım ve yerel reklamlarla kafe ve restoranlar için dijital görünürlük." },
  },
  {
    slug: "mobilya-uretim",
    title: "Mobilya & üretim",
    headline: "Ürününüzün emeğini görünür kılın.",
    intro: "Ürünü, üretim sürecini ve malzeme kalitesini anlatan içerikler; katalog ve web sitesiyle desteklenen, teklif talebine yönlendiren reklamlar.",
    needs: [
      { title: "Ürün anlatımı", text: "Ölçü, malzeme ve kullanım alanını gösteren çekimler." },
      { title: "Üretim süreci", text: "Atölyeden sevkiyata emeği anlatan videolar." },
      { title: "Katalog ve web", text: "Ürün gamını düzenli sunan dijital katalog veya site." },
      { title: "Teklif talepleri", text: "Reklamdan gelen talebin kaybolmadan kaydedilmesi." },
    ],
    services: ["reklam-yonetimi", "fotograf-video-produksiyon", "web-tasarim", "yazilim-yapay-zeka-otomasyon"],
    layout: "catalog",
    seo: { title: "Mobilya ve Üretim Firmaları için Dijital Pazarlama | Ventos Digital", description: "Ürün çekimi, üretim süreci içerikleri, katalog/web ve teklif talebi odaklı reklamlar." },
  },
  {
    slug: "e-ticaret",
    title: "E-ticaret",
    headline: "Mağazadan siparişe, tek akış.",
    intro: "Mağaza kurulumu, ürün sayfaları, görsel içerik, reklam ve sipariş takibini birbirine bağlı bir sistem olarak ele alıyoruz.",
    needs: [
      { title: "Mağaza", text: "Kategori yapısı, tema ve temel sayfalar." },
      { title: "Ürün sayfası", text: "Açıklama, varyasyon ve güven veren detaylar." },
      { title: "Görsel içerik", text: "Ürün fotoğrafı, kullanım videosu ve UGC." },
      { title: "Reklam", text: "Ürün kataloğu ile çalışan Meta kampanyaları." },
      { title: "Sipariş takibi", text: "Sipariş, stok ve kargo bildirimlerinin düzeni." },
    ],
    services: ["e-ticaret", "fotograf-video-produksiyon", "reklam-yonetimi", "yazilim-yapay-zeka-otomasyon"],
    layout: "store",
    seo: { title: "E-ticaret Markaları için Mağaza, İçerik ve Reklam | Ventos Digital", description: "Online mağaza kurulumu, ürün sayfaları, görsel içerik, reklam ve sipariş takibi." },
  },
];

export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);
