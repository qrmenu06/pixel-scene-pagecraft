import type { ProjectCategory, ServiceSlug } from "./services";
import cDalyy from "@/assets/covers/dalyy-done.webp.asset.json";
import cPalmeira from "@/assets/covers/palmeira-lounge.webp.asset.json";
import cMarrakesh from "@/assets/covers/marrakesh-garden-etlik.webp.asset.json";
import cNovera from "@/assets/covers/novera-ofis-mobilyalari.webp.asset.json";
import cHarun from "@/assets/covers/harun-sandalye.webp.asset.json";
import cSekmenler from "@/assets/covers/sekmenler-hayvancilik.webp.asset.json";
import cUnal from "@/assets/covers/unal-deutschland.webp.asset.json";
import cOsmanbey from "@/assets/covers/osmanbey-agriculture.webp.asset.json";
import cAsiyan from "@/assets/covers/asiyan-koleji.png.asset.json";
import cGastro from "@/assets/covers/gastroyummy.png.asset.json";

export type MediaItem = { src: string; alt: string; width: number; height: number; kind?: "image" | "video"; poster?: string };

/** Portfolyoda sergilenen tekil sosyal medya içeriği. mediaSrc varsa sitede gösterilir, yoksa instagramUrl resmi gömme ile gösterilir. */
export type SocialItem = {
  type: "reel" | "video" | "photo" | "post";
  instagramUrl?: string;
  mediaSrc?: string;
  posterSrc?: string;
  alt: string;
  caption?: string;
  order: number;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  sector: "kafe-restoran" | "mobilya-uretim" | "e-ticaret" | "tarim-hayvancilik" | "egitim" | "teknoloji";
  sectorLabel: string;
  categories: ProjectCategory[];
  services: ServiceSlug[];
  /** "ventos": Ventos işi, "team": ekip üyelerinin önceki işi */
  attribution: "ventos" | "team";
  summary: string;
  need: string;
  contribution: string[];
  deliverables: string[];
  logo?: MediaItem;
  cover?: MediaItem;
  gallery: MediaItem[];
  video?: MediaItem;
  instagramProfileUrl?: string;
  /** Öne çıkan video/Reels; galeride tekrarlanmaz */
  featuredVideo?: SocialItem;
  socialItems?: SocialItem[];
  order: number;
  featured: boolean;
  status: "published" | "draft";
  /** Medya henüz eklenmediyse true; site tipografik kart gösterir */
  mediaPending: boolean;
  seo: { title: string; description: string };
};

const cv = (a: { url: string }, alt: string): MediaItem => ({ src: a.url, alt, width: 1536, height: 1024 });
const reel = (instagramUrl: string, client: string, order: number): SocialItem => ({ type: "reel", instagramUrl, alt: `${client} için hazırlanan Reels çalışması`, caption: "Reels çalışması", order });

const covers: Record<string, MediaItem> = {
  "dalyy-done": cv(cDalyy, "Dalyy Done için hazırlanan, siyah tabakta cheesecake ve alevli tava içeren ürün tasarımı"),
  "palmeira-lounge": cv(cPalmeira, "Palmeira Lounge için hazırlanan, cheesecake ve mavi içecek içeren gönderi tasarımı"),
  "marrakesh-garden-etlik": cv(cMarrakesh, "Marrakesh Garden Etlik için hazırlanan, penne ve burger içeren gönderi tasarımı"),
  "novera-ofis-mobilyalari": cv(cNovera, "Novera Ofis Mobilyaları Meta reklam çalışması sunumu"),
  "harun-sandalye": cv(cHarun, "Harun Sandalye dijital reklam çalışması sunumu"),
  "sekmenler-hayvancilik": cv(cSekmenler, "Sekmenler Hayvancılık reklam çalışması sunumu"),
  "unal-deutschland": cv(cUnal, "Ünal Deutschland e-ticaret sitesi ekran sunumu"),
  "osmanbey-agriculture": cv(cOsmanbey, "Osmanbey Agriculture kurumsal web sitesi ekran sunumu"),
  "asiyan-koleji": cv(cAsiyan, "Aşiyan Koleji web sitesi ekran sunumu"),
  gastroyummy: cv(cGastro, "GastroYummy uygulama tanıtım sitesi ekran sunumu"),
};

const p = (x: Omit<Project, "gallery" | "seo"> & Partial<Pick<Project, "gallery" | "seo">>): Project => {
  const cover = x.cover ?? covers[x.slug];
  return <Project>{
    gallery: [],
    seo: {
      title: `${x.client} — ${x.title} | Ventos Digital`,
      description: x.summary,
    },
    ...x,
    cover,
    mediaPending: cover ? false : x.mediaPending,
  };
};

export const allProjects: Project[] = [
  p({
    slug: "dalyy-done",
    instagramProfileUrl: "https://www.instagram.com/dalyydonecafe/",
    featuredVideo: reel("https://www.instagram.com/dalyydonecafe/reel/Db0TFO6D3ur/", "Dalyy Done", 0),
    socialItems: [reel("https://www.instagram.com/dalyydonecafe/reel/DcHQhSeEi9f/", "Dalyy Done", 1)],
    title: "Sosyal medya ve içerik üretimi",
    client: "Dalyy Done",
    sector: "kafe-restoran",
    sectorLabel: "Kafe & restoran",
    categories: ["sosyal-medya", "fotograf-video"],
    services: ["sosyal-medya-yonetimi", "fotograf-video-produksiyon"],
    attribution: "ventos",
    summary: "Ürün ve atmosfer içerikleri, fotoğraf, Reels, tasarım, story ve etkinlik duyuruları.",
    need: "Ürünlerin ve mekân atmosferinin düzenli, tutarlı bir dille sosyal medyada gösterilmesi.",
    contribution: ["İçerik planlama", "Ürün ve atmosfer çekimleri", "Reels kurgusu", "Gönderi ve story tasarımı", "Etkinlik duyuruları"],
    deliverables: ["Fotoğraf", "Reels", "Gönderi tasarımları", "Story içerikleri", "Etkinlik duyuruları"],
    order: 1,
    featured: true,
    status: "published",
    mediaPending: true,
  }),
  p({
    slug: "palmeira-lounge",
    instagramProfileUrl: "https://www.instagram.com/palmeira_lounge/",
    featuredVideo: reel("https://www.instagram.com/reel/Dbvy1XVlJFE/", "Palmeira Lounge", 0),
    socialItems: [
      reel("https://www.instagram.com/reel/DdUMptMDShX/", "Palmeira Lounge", 1),
      reel("https://www.instagram.com/reel/Dd_eLX-mu_J/", "Palmeira Lounge", 2),
    ],
    title: "Sosyal medya ve içerik üretimi",
    client: "Palmeira Lounge",
    sector: "kafe-restoran",
    sectorLabel: "Kafe & restoran",
    categories: ["sosyal-medya", "fotograf-video"],
    services: ["sosyal-medya-yonetimi", "fotograf-video-produksiyon"],
    attribution: "ventos",
    summary: "Lounge için sosyal medya yönetimi ve içerik üretimi.",
    need: "Mekânın atmosferini ve menüsünü sosyal medyada düzenli olarak öne çıkarmak.",
    contribution: ["Sosyal medya yönetimi", "İçerik üretimi"],
    deliverables: ["Gönderiler", "Story içerikleri", "Video içerikler"],
    order: 2,
    featured: true,
    status: "published",
    mediaPending: true,
  }),
  p({
    slug: "marrakesh-garden-etlik",
    instagramProfileUrl: "https://www.instagram.com/marrakeshgardenetlik/",
    featuredVideo: reel("https://www.instagram.com/marrakeshgardenetlik/reel/Ddt8p4Pj7QO/", "Marrakesh Garden Etlik", 0),
    socialItems: [reel("https://www.instagram.com/marrakeshgardenetlik/reel/DdUTg1ODY-8/", "Marrakesh Garden Etlik", 1)],
    title: "Sosyal medya ve içerik üretimi",
    client: "Marrakesh Garden Etlik",
    sector: "kafe-restoran",
    sectorLabel: "Kafe & restoran",
    categories: ["sosyal-medya", "fotograf-video"],
    services: ["sosyal-medya-yonetimi", "fotograf-video-produksiyon"],
    attribution: "ventos",
    summary: "Bahçe mekânı için sosyal medya yönetimi ve içerik üretimi.",
    need: "Mekânın konseptini ve deneyimini sosyal medyada anlatmak.",
    contribution: ["Sosyal medya yönetimi", "İçerik üretimi"],
    deliverables: ["Gönderiler", "Story içerikleri", "Video içerikler"],
    order: 3,
    featured: false,
    status: "published",
    mediaPending: true,
  }),
  p({
    slug: "novera-ofis-mobilyalari",
    title: "Reklam çalışmaları",
    client: "Novera Ofis Mobilyaları",
    sector: "mobilya-uretim",
    sectorLabel: "Mobilya & üretim",
    categories: ["reklam"],
    services: ["reklam-yonetimi"],
    attribution: "ventos",
    summary: "Ofis mobilyası üreticisi için Meta reklam çalışmaları.",
    need: "Ürün gamını doğru kitleye tanıtmak ve teklif taleplerine yönlendirmek.",
    contribution: ["Reklam kurgusu", "Kampanya yönetimi"],
    deliverables: ["Reklam kampanyaları", "Reklam kreatifleri"],
    order: 4,
    featured: true,
    status: "published",
    mediaPending: true,
  }),
  p({
    slug: "harun-sandalye",
    title: "Reklam çalışmaları",
    client: "Harun Sandalye",
    sector: "mobilya-uretim",
    sectorLabel: "Mobilya & üretim",
    categories: ["reklam"],
    services: ["reklam-yonetimi"],
    attribution: "ventos",
    summary: "Sandalye üreticisi için Meta reklam çalışmaları.",
    need: "Ürünleri potansiyel alıcılara ulaştırmak.",
    contribution: ["Reklam kurgusu", "Kampanya yönetimi"],
    deliverables: ["Reklam kampanyaları", "Reklam kreatifleri"],
    order: 5,
    featured: false,
    status: "published",
    mediaPending: true,
  }),
  p({
    slug: "sekmenler-hayvancilik",
    title: "Reklam çalışmaları",
    client: "Sekmenler Hayvancılık",
    sector: "tarim-hayvancilik",
    sectorLabel: "Tarım & hayvancılık",
    categories: ["reklam"],
    services: ["reklam-yonetimi"],
    attribution: "ventos",
    summary: "Hayvancılık işletmesi için Meta reklam çalışmaları.",
    need: "İşletmenin hizmet ve ürünlerini hedef kitleye duyurmak.",
    contribution: ["Reklam kurgusu", "Kampanya yönetimi"],
    deliverables: ["Reklam kampanyaları"],
    order: 6,
    featured: false,
    status: "published",
    mediaPending: true,
  }),
  p({
    slug: "unal-deutschland",
    title: "E-ticaret sitesi",
    client: "Ünal Deutschland",
    sector: "e-ticaret",
    sectorLabel: "E-ticaret",
    categories: ["web", "e-ticaret"],
    services: ["e-ticaret", "web-tasarim"],
    attribution: "team",
    summary: "Online satış için e-ticaret sitesi.",
    need: "Ürünlerin online satışa açılması.",
    contribution: ["E-ticaret sitesi"],
    deliverables: ["E-ticaret sitesi"],
    order: 7,
    featured: true,
    status: "published",
    mediaPending: true,
  }),
  p({
    slug: "osmanbey-agriculture",
    title: "Kurumsal web sitesi",
    client: "Osmanbey Agriculture",
    sector: "tarim-hayvancilik",
    sectorLabel: "Tarım",
    categories: ["web"],
    services: ["web-tasarim"],
    attribution: "team",
    summary: "Tarım firması için kurumsal web sitesi.",
    need: "Firmanın faaliyetlerini kurumsal bir sitede anlatmak.",
    contribution: ["Kurumsal web sitesi"],
    deliverables: ["Kurumsal web sitesi"],
    order: 8,
    featured: false,
    status: "published",
    mediaPending: true,
  }),
  p({
    slug: "asiyan-koleji",
    title: "Eğitim kurumu web sitesi",
    client: "Aşiyan Koleji",
    sector: "egitim",
    sectorLabel: "Eğitim",
    categories: ["web"],
    services: ["web-tasarim"],
    attribution: "team",
    summary: "Eğitim kurumu için web sitesi.",
    need: "Kurumu ve programlarını velilere anlatan bir site.",
    contribution: ["Web sitesi"],
    deliverables: ["Web sitesi"],
    order: 9,
    featured: false,
    status: "published",
    mediaPending: true,
  }),
  p({
    slug: "gastroyummy",
    title: "Uygulama tanıtım sitesi",
    client: "GastroYummy",
    sector: "teknoloji",
    sectorLabel: "Teknoloji",
    categories: ["web"],
    services: ["web-tasarim"],
    attribution: "team",
    summary: "Mobil uygulama için tanıtım sitesi. Uygulamanın kendisi bu çalışmanın kapsamında değildir.",
    need: "Uygulamanın özelliklerini anlatan bir tanıtım sitesi.",
    contribution: ["Tanıtım sitesi"],
    deliverables: ["Tanıtım sitesi"],
    order: 10,
    featured: false,
    status: "published",
    mediaPending: true,
  }),
  p({
    slug: "phishy",
    title: "Web çalışması",
    client: "Phishy",
    sector: "teknoloji",
    sectorLabel: "Teknoloji",
    categories: ["web"],
    services: ["web-tasarim"],
    attribution: "team",
    summary: "Katkı netleşene kadar yayımlanmıyor.",
    need: "",
    contribution: [],
    deliverables: [],
    order: 99,
    featured: false,
    status: "draft",
    mediaPending: true,
  }),
];

export const projectFilters: { key: "tumu" | ProjectCategory; label: string }[] = [
  { key: "tumu", label: "Tümü" },
  { key: "sosyal-medya", label: "Sosyal medya" },
  { key: "reklam", label: "Reklam" },
  { key: "fotograf-video", label: "Fotoğraf-video" },
  { key: "web", label: "Web" },
  { key: "e-ticaret", label: "E-ticaret" },
];

export const publishedProjects = () =>
  allProjects.filter((x) => x.status === "published").sort((a, b) => a.order - b.order);

export const filterProjects = (list: Project[], key: string) =>
  key === "tumu" || !key ? list : list.filter((x) => x.categories.includes(key as ProjectCategory));

export const getPublishedProject = (slug: string) => publishedProjects().find((x) => x.slug === slug);

export const attributionLabel = (a: Project["attribution"]) =>
  a === "ventos" ? "Ventos Digital çalışması" : "Ekip üyelerimizin önceki çalışması";
