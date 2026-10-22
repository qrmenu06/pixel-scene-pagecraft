# Ventos Digital — Çok Sayfalı Ajans Sitesi

## 1. Referans incelemesi (ilk adım)
- Ador ana sayfa, sosyal medya ajansı, işler, referanslar, fiyatlar sayfalarını ve önceki Ventos sitesini ekran görüntüsü + metin olarak incele.
- Erişilemeyen bağlantıları açıkça bildir; en fazla 5 somut tasarım kararını kısa yaz, sonra uygulamaya geç.
- Ador'un görselleri, metinleri, fiyatları, müşteri listesi kopyalanmaz.

## 2. Görsel sistem
- Renkler: lacivert #0B1A33, cyan #16C7E8, kırık beyaz ve açık gri yüzeyler; koyu/açık bölüm ritmi.
- İki font: karakterli bir başlık fontu + okunaklı gövde fontu (Inter/Poppins değil).
- "Ventos Digital" sade yazı işareti (logo gelene kadar, sembol yok).
- Rüzgâr fikri: ince akış çizgileri, yatay kayan geçişler, scroll ile değişen kompozisyonlar; prefers-reduced-motion ve durdurulabilir hareket.
- Hero ve hizmet bölümleri için üretilmiş görseller + içerikli mockup'lar (telefon akışı, story, web ekranı, içerik takvimi, otomasyon akışı) — "Örnek uygulama" etiketiyle.

## 3. Sayfalar
```text
/                         Vitrin ana sayfa (hero, referans bandı, seçili işler,
                          ihtiyaca göre yönlendirme, hizmet özeti, bağlantılı
                          çalışma modeli, süreç+sektörler, paket önizleme, CTA)
/hizmetler + 7 hizmet sayfası (her biri farklı görsel düzen, SSS, ön seçimli teklif)
/calismalar               Filtre: Tümü, Sosyal medya, Reklam, Fotoğraf-video, Web, E-ticaret
/calismalar/$proje        İhtiyaç, katkı, teslimler, galeri (varsa), ilgili hizmetler
/referanslar /paketler /hakkimizda /iletisim /teklif
/sektorler/kafe-restoran /mobilya-uretim /e-ticaret
404 sayfası
```
- Header: logo, Hizmetler (masaüstü açılır menü, mobil menü), Çalışmalar, Referanslar, Paketler, Hakkımızda, "Teklif al". Aktif sayfa vurgusu, alt sayfalarda breadcrumb.

## 4. İçerik ve dürüstlük kuralları
- Projeler: Dalyy Done, Palmeira Lounge, Marrakesh Garden Etlik, Novera, Harun Sandalye, Sekmenler (yayında); Ünal Deutschland, Osmanbey, Aşiyan Koleji, GastroYummy (web, medya bekliyor); Phishy taslak.
- Medyası olmayan projeler kompakt tipografik kartla gösterilir, boş galeri yok.
- Fiyat, metrik, tarih, yorum, ekip ismi, iletişim kanalı uydurulmaz; fiyatlar "Kapsama göre teklif". Boş iletişim kanalları gizli kalır.

## 5. Teklif formu
- 3 adım: hizmet (çoklu + "Emin değilim") → ihtiyaç (sektör, açıklama, başlangıç) → iletişim (ad, işletme, e-posta veya telefon).
- URL'den paket/hizmet ön seçimi, geri gidince veri korunur, doğrulama, yükleniyor/hata/tekrar dene/başarı.
- Talepler Lovable Cloud'da saklanır; ziyaretçiler okuyamaz. Başarı mesajı yalnızca kayıt sonrası.
- Spam önlemleri: gizli bal küpü alanı, minimum doldurma süresi, sunucu tarafı zod doğrulama ve IP bazlı basit hız sınırı.
- Yetkili görünüm: e-posta/şifre girişli `/yonetim` sayfası; yalnızca admin rolüne sahip hesap talepleri en yeniden eskiye listeler (üyelik kaydı kapalı, admin hesabı sizin e-postanızla oluşturulur).

## 5b. Adres tutarlılığı
- Canonical, og:url ve sitemap mevcut isteğin gerçek adresinden üretilir; ventosdigital.com bağlandığında otomatik doğru olur, öncesinde sahte yönlendirme yok.
- Gerekirse tek bir site ayarı ile sabit alan adı tanımlanabilir.

## 5c. Teslim raporu
- Erişilen referans sayfaları ve gözleme dayalı en fazla 5 karar (yerleşim ve davranış tarifiyle).
- Test edilen işlevler, bekleyen bağlantılar, sizden gereken logo, medya, iletişim, fiyat bilgileri.

## 6. SEO ve kalite
- Her sayfaya özgün title/description/canonical/og; sitemap.xml, robots.txt, Organization yapılandırılmış verisi; site adresi tek ayardan (ventosdigital.com).
- 390/768/1440 px kontrolü, menü, filtre, ön seçim, form ve 404 Playwright ile test edilir.

## Teknik detaylar
- Merkezi veri: `src/content/` altında services, projects (slug, sektör, hizmetler, katkı, teslimler, logo, kapak, galeri, video, seo, sıra, featured, status), clients, packages (pricing: type fixed|from|custom, amount, tax, period, setup, monthly, adBudget ayrı), faqs, site settings (siteUrl, iletişim kanalları opsiyonel).
- TanStack route dosyaları: `hizmetler.index.tsx`, `hizmetler.$slug.tsx`, `calismalar.$proje.tsx` (notFound), `sektorler.$slug.tsx`.
- Lovable Cloud: `quote_requests` tablosu, anon INSERT politikası, SELECT yok; createServerFn + zod doğrulama.
- Sitemap server route `/sitemap.xml` veriden üretilir.
- Kurallar için küçük testler (yayın durumu filtresi, fiyat "özel teklif" gösterimi, filtre mantığı).
