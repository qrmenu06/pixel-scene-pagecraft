import type { ProjectCategory, ServiceSlug } from "./services";

export type MediaItem = { src: string; alt: string; width: number; height: number; kind?: "image" | "video"; poster?: string };

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
  order: number;
  featured: boolean;
  status: "published" | "draft";
  /** Medya henüz eklenmediyse true; site tipografik kart gösterir */
  mediaPending: boolean;
  seo: { title: string; description: string };
};

const p = (x: Omit<Project, "gallery" | "seo"> & Partial<Pick<Project, "gallery" | "seo">>): Project => ({
  gallery: [],
  seo: {
    title: `${x.client} — ${x.title} | Ventos Digital`,
    description: x.summary,
  },
  ...x,
});

export const allProjects: Project[] = [
  p({
    slug: "dalyy-done",
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
