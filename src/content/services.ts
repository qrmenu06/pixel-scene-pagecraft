export type ServiceSlug =
  | "sosyal-medya-yonetimi"
  | "reklam-yonetimi"
  | "fotograf-video-produksiyon"
  | "web-tasarim"
  | "e-ticaret"
  | "marka-kimligi-tasarim"
  | "yazilim-yapay-zeka-otomasyon";

export type Service = {
  slug: ServiceSlug;
  title: string;
  short: string;
  menuLabel: string;
  group: "İçerik ve pazarlama" | "Teknoloji" | "E-ticaret";
  headline: string;
  intro: string;
  forWho: string[];
  problem: string;
  outputs: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  included: string[];
  separate: string[];
  faqs: { q: string; a: string }[];
  /** Portföy filtresi ile eşleşme */
  category: ProjectCategory | null;
  seo: { title: string; description: string };
};

export type ProjectCategory = "sosyal-medya" | "reklam" | "fotograf-video" | "web" | "e-ticaret";

export const services: Service[] = [
  {
    slug: "sosyal-medya-yonetimi",
    title: "Sosyal medya yönetimi",
    menuLabel: "Sosyal medya",
    short: "Aylık içerik planı, çekim, tasarım ve paylaşım. Hesabınız düzenli ve markanıza uygun ilerler.",
    group: "İçerik ve pazarlama",
    headline: "Hesabınız her hafta, aynı kaliteyle yayında.",
    intro:
      "İçerik takvimini birlikte planlıyor, çekimi yapıyor, gönderi ve Reels'leri hazırlayıp onayınıza sunuyoruz. Onaylanan içerikler planlanan günde yayınlanır.",
    forWho: [
      "Kafe, restoran ve lounge işletmeleri",
      "Ürününü düzenli göstermek isteyen markalar",
      "Hesabı var ama düzenli paylaşım yapamayan işletmeler",
    ],
    problem:
      "Paylaşımlar aksıyor, görseller birbirini tutmuyor ve hesap işletmenin gerçek kalitesini yansıtmıyor. Her hafta “bugün ne paylaşsak” sorusu zaman kaybettiriyor.",
    outputs: [
      { title: "Aylık içerik takvimi", text: "Hangi gün ne paylaşılacağı, hangi kampanya veya etkinliğin öne çıkacağı tek tabloda." },
      { title: "Gönderi ve carousel tasarımları", text: "Marka renklerinize ve yazı karakterinize uygun, tutarlı bir profil düzeni." },
      { title: "Reels ve story içerikleri", text: "Ürün, atmosfer ve ekip anlarını kısa videolarla anlatan içerikler." },
      { title: "Metin ve açıklamalar", text: "Gönderi metinleri, duyurular ve etkinlik metinleri." },
    ],
    steps: [
      { title: "Planlama", text: "Ay başında öne çıkacak ürün, kampanya ve günleri belirleriz." },
      { title: "Çekim", text: "Planlanan içerikler için mekânda veya stüdyoda çekim yaparız." },
      { title: "Tasarım ve kurgu", text: "Fotoğraf, gönderi ve videoları hazırlarız." },
      { title: "Onay", text: "Hazırlanan içerikleri yayından önce size gösteririz." },
      { title: "Paylaşım", text: "Onaylı içerikleri planlanan tarihlerde yayınlarız." },
    ],
    included: ["İçerik takvimi", "Gönderi ve story tasarımları", "Reels kurgusu", "Metin yazımı", "Paylaşım planlaması"],
    separate: ["Meta reklam bütçesi", "Ek çekim günleri", "Influencer / UGC iş birlikleri", "Baskı materyalleri"],
    faqs: [
      { q: "Kaç gönderi paylaşılıyor?", a: "Gönderi ve video sayısı işletmenizin ihtiyacına ve seçilen kapsama göre belirlenir; teklifte net olarak yazılır." },
      { q: "İçerikleri yayından önce görebilir miyim?", a: "Evet. Her içerik yayından önce onayınıza sunulur." },
      { q: "Çekimi kim yapıyor?", a: "Çekimleri kendi ekibimiz planlar ve gerçekleştirir." },
    ],
    category: "sosyal-medya",
    seo: {
      title: "Sosyal Medya Yönetimi Ankara | Ventos Digital",
      description: "İçerik takvimi, çekim, gönderi tasarımı, Reels ve paylaşım. Ventos Digital ile hesabınız düzenli ve markanıza uygun ilerler.",
    },
  },
  {
    slug: "reklam-yonetimi",
    title: "Reklam yönetimi",
    menuLabel: "Meta reklamları",
    short: "Instagram ve Facebook kampanyalarının kurulumu, kreatifleri, testi ve düzenli değerlendirmesi.",
    group: "İçerik ve pazarlama",
    headline: "Doğru kişiye, doğru mesajla ulaşın.",
    intro:
      "Instagram ve Facebook reklamlarınızı hedefinize göre kuruyor, reklam görsellerini hazırlıyor, farklı mesajları test ediyor ve sonuçları sizinle düzenli olarak değerlendiriyoruz.",
    forWho: ["Teklif veya sipariş toplamak isteyen üreticiler", "Yerel müşteri çekmek isteyen işletmeler", "Online mağazasına ziyaretçi getirmek isteyen markalar"],
    problem:
      "“Gönderiyi öne çıkar” butonuyla harcanan bütçe, kime ulaşıldığı ve ne getirdiği belli olmadan tükeniyor.",
    outputs: [
      { title: "Kampanya kurgusu", text: "Hedef, kitle ve bütçe dağılımının yazılı planı." },
      { title: "Reklam kreatifleri", text: "Görsel, video ve metin varyasyonları." },
      { title: "Test ve optimizasyon", text: "Farklı mesaj ve görsellerin karşılaştırılması." },
      { title: "Düzenli değerlendirme", text: "Harcama ve sonuçların anlaşılır bir özetle paylaşılması." },
    ],
    steps: [
      { title: "Hedefi netleştirme", text: "Mesaj, arama, sipariş veya ziyaret: ne istediğinizi belirleriz." },
      { title: "Kreatif hazırlık", text: "Reklamda kullanılacak görsel ve metinleri hazırlarız." },
      { title: "Kurulum", text: "Hesap, piksel ve kampanya yapısını kurarız." },
      { title: "Test", text: "Farklı kitle ve mesajları küçük bütçelerle deneriz." },
      { title: "Değerlendirme", text: "Sonuçlara göre bütçeyi işe yarayan tarafa yönlendiririz." },
    ],
    included: ["Kampanya planı", "Kampanya kurulumu", "Reklam metinleri", "Temel kreatif uyarlamaları", "Düzenli rapor"],
    separate: ["Platform reklam bütçesi (Meta'ya doğrudan ödenir)", "Yeni video çekimi", "Açılış sayfası tasarımı"],
    faqs: [
      { q: "Reklam bütçesi ücrete dahil mi?", a: "Hayır. Yönetim ücreti ile Meta'ya ödenen reklam bütçesi ayrı tutulur; bütçe doğrudan sizin hesabınızdan harcanır." },
      { q: "Ne kadar sürede sonuç alırım?", a: "Sektöre, bütçeye ve hedefe göre değişir. Gerçek veriye dayanmayan bir süre veya sonuç taahhüdü vermiyoruz." },
      { q: "Raporu ne sıklıkla görüyorum?", a: "Rapor sıklığı kapsamda belirlenir ve teklifte yazılır." },
    ],
    category: "reklam",
    seo: {
      title: "Meta Reklam Yönetimi | Ventos Digital",
      description: "Instagram ve Facebook reklamlarının kurulumu, kreatif hazırlığı, testi ve değerlendirmesi. Yönetim ücreti ve reklam bütçesi ayrı.",
    },
  },
  {
    slug: "fotograf-video-produksiyon",
    title: "Fotoğraf ve video prodüksiyon",
    menuLabel: "Fotoğraf & video",
    short: "Ürün, mekân, drone, Reels ve UGC çekimleri. Sosyal medyada, web'de ve reklamda kullanılacak içerikler.",
    group: "İçerik ve pazarlama",
    headline: "İşinizi olduğu gibi, en iyi hâliyle gösterin.",
    intro:
      "Ürün, mekân ve atmosfer çekimlerinden drone görüntülerine, Reels ve UGC videolarına kadar kullanım yerine göre planlanmış içerikler üretiyoruz.",
    forWho: ["Menüsünü ve mekânını göstermek isteyen restoranlar", "Katalog ve web için ürün fotoğrafı arayan üreticiler", "Reklamda kullanacak kısa video isteyen markalar"],
    problem: "Telefonla çekilmiş, ışığı ve kadrajı tutarsız görseller ürünün gerçek kalitesini düşürüyor.",
    outputs: [
      { title: "Ürün fotoğrafları", text: "Beyaz fon, atmosfer ve detay kareleri." },
      { title: "Mekân ve atmosfer", text: "İç mekân, dış alan, ekip ve servis anları." },
      { title: "Drone çekimi", text: "Mekânın konumunu ve büyüklüğünü gösteren havadan görüntüler." },
      { title: "Reels ve UGC", text: "Dikey formatta, sosyal medyaya ve reklama uygun kısa videolar." },
    ],
    steps: [
      { title: "Çekim planı", text: "Hangi içeriklerin nerede kullanılacağını ve çekim listesini çıkarırız." },
      { title: "Hazırlık", text: "Mekân, ürün ve ışık hazırlığını planlarız." },
      { title: "Çekim günü", text: "Fotoğraf ve videoları çekeriz." },
      { title: "Seçim ve düzenleme", text: "Kareleri seçer, renk ve kurgu düzenlemesini yaparız." },
      { title: "Teslim", text: "Kullanım yerine uygun boyutlarda teslim ederiz." },
    ],
    included: ["Çekim planı", "Fotoğraf/video çekimi", "Renk düzenleme", "Kurgu", "Formatlara göre teslim"],
    separate: ["Model / oyuncu", "Stüdyo kiralama", "Uzak lokasyon ulaşımı", "Drone izin gerektiren alanlar"],
    faqs: [
      { q: "Yapay zekâ ile üretim yapıyor musunuz?", a: "Bazı arka plan, konsept veya taslak görsellerde yapay zekâ destekli üretim kullanılabilir. Bu içerikleri gerçek çekim gibi sunmuyor, açıkça belirtiyoruz." },
      { q: "Drone her yerde uçabilir mi?", a: "Hayır. İzin gerektiren bölgelerde çekim, gerekli izinlere bağlıdır." },
    ],
    category: "fotograf-video",
    seo: {
      title: "Fotoğraf, Video ve Drone Prodüksiyon | Ventos Digital",
      description: "Ürün, mekân, drone, Reels ve UGC çekimleri. Sosyal medya, web ve reklam için planlanmış içerik üretimi.",
    },
  },
  {
    slug: "web-tasarim",
    title: "Web tasarım ve geliştirme",
    menuLabel: "Web sitesi",
    short: "Kurumsal web siteleri: sayfa planı, tasarım, geliştirme, içerik yerleşimi ve yayına alma.",
    group: "Teknoloji",
    headline: "İşinizi anlatan, talep getiren bir web sitesi.",
    intro:
      "Sayfa planından tasarıma, geliştirmeden yayına almaya kadar web sitenizi baştan sona hazırlıyoruz. Masaüstü ve mobilde aynı özenle çalışır.",
    forWho: ["Kurumsal tanıtım sitesi gereken firmalar", "Eğitim kurumları ve hizmet işletmeleri", "Uygulama veya ürününü tanıtmak isteyen girişimler"],
    problem: "Eski, mobilde bozulan veya hiç güncellenmeyen bir site, potansiyel müşteriye yanlış bir ilk izlenim bırakıyor.",
    outputs: [
      { title: "Sayfa planı", text: "Hangi sayfaların olacağı ve her sayfada ne anlatılacağı." },
      { title: "Tasarım", text: "Masaüstü ve mobil ekran tasarımları." },
      { title: "Geliştirme", text: "Hızlı açılan, arama motorlarına uygun site." },
      { title: "Yayına alma", text: "Alan adı bağlantısı ve temel ayarlar." },
    ],
    steps: [
      { title: "Keşif", text: "İşinizi, hedef kitlenizi ve sitenin amacını konuşuruz." },
      { title: "Sayfa planı", text: "Site haritası ve içerik başlıklarını çıkarırız." },
      { title: "Tasarım", text: "Ana sayfa ve şablon sayfaları tasarlarız." },
      { title: "Geliştirme ve içerik", text: "Siteyi kodlar, içerikleri yerleştiririz." },
      { title: "Yayın ve güncelleme", text: "Siteyi yayına alır, kapsamdaki güncellemeleri yaparız." },
    ],
    included: ["Sayfa planı", "Özel tasarım", "Mobil uyum", "Temel SEO ayarları", "İletişim / teklif formu", "Yayına alma"],
    separate: ["Alan adı ve barındırma ücretleri", "Çok dilli içerik çevirisi", "Profesyonel metin yazımı", "Sürekli bakım"],
    faqs: [
      { q: "Siteyi sonra kendim güncelleyebilir miyim?", a: "Kapsama göre içerik yönetimi eklenebilir; teklif aşamasında birlikte belirleriz." },
      { q: "Ne kadar sürer?", a: "Sayfa sayısına ve içeriklerin hazır olmasına göre değişir; takvim teklifte yazılır." },
    ],
    category: "web",
    seo: {
      title: "Kurumsal Web Tasarım ve Geliştirme | Ventos Digital",
      description: "Sayfa planı, özel tasarım, geliştirme, içerik yerleşimi ve yayına alma. Masaüstü ve mobilde aynı özenle çalışan web siteleri.",
    },
  },
  {
    slug: "e-ticaret",
    title: "E-ticaret",
    menuLabel: "E-ticaret",
    short: "Online mağaza kurulumu, ürün sunumu ve mağaza açıldıktan sonra içerik ve reklam desteği.",
    group: "E-ticaret",
    headline: "Ürünleriniz online'da da satılsın.",
    intro:
      "Mağazanızı kuruyor, ürünleri düzgün sunuyor, ödeme ve kargo adımlarını ayarlıyoruz. İsterseniz açılıştan sonra içerik ve reklamla mağazayı birlikte büyütüyoruz.",
    forWho: ["İlk online mağazasını açacak markalar", "Mevcut mağazası düzensiz olan satıcılar", "Ürün fotoğrafı ve reklam desteği arayan mağazalar"],
    problem: "Ürünler eksik bilgiyle, kötü fotoğraflarla listeleniyor; ödeme veya kargo adımı müşteriyi yarı yolda bırakıyor.",
    outputs: [
      { title: "Mağaza kurulumu", text: "Tema, kategori yapısı ve temel sayfalar." },
      { title: "Ürün sunumu", text: "Ürün sayfaları, açıklamalar ve fotoğraflar." },
      { title: "Ödeme ve kargo", text: "Ödeme altyapısı ve kargo seçeneklerinin bağlanması." },
      { title: "Sipariş takibi", text: "Siparişlerin ve stok durumunun izlenmesi için düzen." },
    ],
    steps: [
      { title: "Kurulum", text: "Platform seçimi, tema ve kategori yapısı." },
      { title: "Ürün yükleme", text: "Ürün bilgileri, varyasyonlar ve görseller." },
      { title: "Ödeme ve kargo", text: "Tahsilat ve gönderim adımlarının test edilmesi." },
      { title: "Açılış", text: "Mağazanın yayına alınması." },
      { title: "Büyütme (isteğe bağlı)", text: "Aylık içerik ve reklam desteği." },
    ],
    included: ["Mağaza kurulumu", "Kategori ve ürün yapısı", "Ödeme / kargo entegrasyonu", "Temel sayfalar"],
    separate: ["Platform ve ödeme komisyonları", "Toplu ürün fotoğrafı çekimi", "Aylık içerik ve reklam desteği", "Pazaryeri entegrasyonları"],
    faqs: [
      { q: "Kurulum ile aylık destek ayrı mı?", a: "Evet. Mağaza kurulumu tek seferlik bir projedir; içerik ve reklam desteği isteğe bağlı aylık hizmettir." },
      { q: "Hangi platformda kuruyorsunuz?", a: "İhtiyacınıza ve bütçenize göre birlikte seçiyoruz." },
    ],
    category: "e-ticaret",
    seo: {
      title: "E-ticaret Mağaza Kurulumu ve Destek | Ventos Digital",
      description: "Online mağaza kurulumu, ürün sunumu, ödeme ve kargo ayarları, açılış sonrası içerik ve reklam desteği.",
    },
  },
  {
    slug: "marka-kimligi-tasarim",
    title: "Marka kimliği ve tasarım",
    menuLabel: "Marka kimliği",
    short: "Logo, renk, tipografi, sosyal medya şablonları ve markanızın kullanıldığı her yere uygulamalar.",
    group: "İçerik ve pazarlama",
    headline: "Her yerde aynı marka, aynı his.",
    intro:
      "Logo, renk paleti, yazı karakterleri ve kullanım kurallarıyla markanızı tanımlıyor; sosyal medya şablonlarından ambalaja kadar uygulamalarını hazırlıyoruz.",
    forWho: ["Yeni açılan işletmeler", "Logosu eskimiş veya tutarsız kullanılan markalar", "Sosyal medyada tutarlı görünmek isteyenler"],
    problem: "Her materyalde farklı renk, farklı logo ve farklı yazı karakteri kullanılıyor; marka akılda kalmıyor.",
    outputs: [
      { title: "Logo ve varyasyonları", text: "Ana logo, yatay/dikey kullanım ve ikon." },
      { title: "Renk ve tipografi", text: "Marka renkleri ve yazı karakteri seçimi." },
      { title: "Sosyal medya şablonları", text: "Gönderi, story ve kapak şablonları." },
      { title: "Uygulama örnekleri", text: "Kartvizit, menü, ambalaj gibi temel uygulamalar." },
    ],
    steps: [
      { title: "Tanışma", text: "Markanın hikâyesini, rakipleri ve hedef kitleyi konuşuruz." },
      { title: "Yön belirleme", text: "Görsel yön önerileri sunarız." },
      { title: "Tasarım", text: "Seçilen yönde logo ve sistem tasarlarız." },
      { title: "Uygulamalar", text: "Şablon ve materyalleri hazırlarız." },
      { title: "Teslim", text: "Tüm dosyaları ve kullanım kılavuzunu teslim ederiz." },
    ],
    included: ["Logo tasarımı", "Renk ve tipografi sistemi", "Sosyal medya şablonları", "Kullanım kılavuzu"],
    separate: ["Baskı ve üretim maliyetleri", "Marka tescil işlemleri", "Kapsamlı ambalaj tasarımı"],
    faqs: [{ q: "Kaç farklı öneri sunuyorsunuz?", a: "Öneri ve revizyon sayısı kapsamda belirlenir ve teklifte yazılır." }],
    category: null,
    seo: {
      title: "Marka Kimliği ve Logo Tasarımı | Ventos Digital",
      description: "Logo, renk, tipografi, sosyal medya şablonları ve uygulama örnekleriyle tutarlı bir marka kimliği.",
    },
  },
  {
    slug: "yazilim-yapay-zeka-otomasyon",
    title: "Yazılım, yapay zekâ ve otomasyon",
    menuLabel: "Yazılım & otomasyon",
    short: "Tekrarlanan işleri otomatikleştiren, talepleri kaydeden ve araçlarınızı birbirine bağlayan çözümler.",
    group: "Teknoloji",
    headline: "Tekrarlanan işleri sisteme bırakın.",
    intro:
      "Her gün elle yaptığınız işleri inceliyor; form, tablo, e-posta ve mesaj araçlarınızı birbirine bağlayan, gerektiğinde yapay zekâ kullanan çözümler kuruyoruz.",
    forWho: ["Talepleri e-posta ve WhatsApp'ta kaybeden işletmeler", "Aynı veriyi birden fazla yere elle giren ekipler", "Müşteri adayı bulma ve takibini düzenlemek isteyenler"],
    problem: "Gelen talepler farklı kanallara dağılıyor, kimin neyle ilgilendiği takip edilemiyor ve aynı işler her gün elle tekrarlanıyor.",
    outputs: [
      { title: "Talep kayıt sistemi", text: "Formdan gelen talebin kaydedilip ilgili kişiye bildirilmesi." },
      { title: "İş akışı otomasyonu", text: "Tekrarlanan adımların kendi kendine çalışması." },
      { title: "Yapay zekâ destekli araçlar", text: "Metin özetleme, sınıflandırma, taslak yanıt gibi yardımcılar." },
      { title: "Araç entegrasyonları", text: "Tablo, e-posta, CRM ve mesaj araçlarının bağlanması." },
    ],
    steps: [
      { title: "İş akışını dinleme", text: "Bugün işin nasıl yapıldığını adım adım çıkarırız." },
      { title: "Kapsam", text: "Neyin otomatikleşeceğini ve neyin insanda kalacağını belirleriz." },
      { title: "Kurulum", text: "Sistemi kurar, araçları bağlarız." },
      { title: "Test", text: "Gerçek örneklerle birlikte deneriz." },
      { title: "Devir", text: "Kullanımı anlatır, gerekirse geliştiririz." },
    ],
    included: ["İhtiyaç analizi", "Kurulum ve entegrasyon", "Test", "Kullanım anlatımı"],
    separate: ["Üçüncü parti araç abonelikleri", "Yapay zekâ kullanım ücretleri", "Sürekli bakım ve geliştirme"],
    faqs: [
      { q: "Fiyat nasıl belirleniyor?", a: "Her otomasyon farklı olduğu için ihtiyaç ve kapsam görüşmesinden sonra özel teklif hazırlıyoruz." },
      { q: "Sayfadaki örnekler müşteri projesi mi?", a: "Hayır. Bu sayfadaki akışlar hizmeti anlatmak için hazırlanmış örnek senaryolardır." },
    ],
    category: null,
    seo: {
      title: "Yazılım, Yapay Zekâ ve İş Akışı Otomasyonu | Ventos Digital",
      description: "Talep kayıt sistemleri, iş akışı otomasyonları, yapay zekâ destekli araçlar ve entegrasyonlar. Kapsama göre özel teklif.",
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
