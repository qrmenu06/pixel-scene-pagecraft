/**
 * Merkezi site ayarları. İletişim kanalları doğrulanana kadar null kalır;
 * null olan kanal sitede hiç gösterilmez.
 */
export const site = {
  name: "Ventos Digital",
  tagline: "Rüzgârı arkanıza alın.",
  city: "Ankara",
  /** Yayın adresi. Boş bırakılırsa canonical/sitemap isteğin geldiği adresten üretilir. */
  siteUrl: "" as string,
  contact: {
    email: null as string | null,
    phone: null as string | null,
    whatsapp: null as string | null, // örn. "905xxxxxxxxx"
    instagram: null as string | null,
    linkedin: null as string | null,
    address: null as string | null,
  },
};

export type ContactKey = keyof typeof site.contact;
