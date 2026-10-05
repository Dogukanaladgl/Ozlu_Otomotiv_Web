# Search Console ve Yerel SEO Operasyonu

Bu belge canlı site için Google Search Console (GSC) ve Google İşletme Profili (GBP) adımlarını özetler.

Sıralama garantisi yoktur. GSC indeksleme ve sorgu verisini yönetir; Konya yerel görünürlüğünde asıl kaldıraç tutarlı NAP + GBP kalitesidir.

İnce anahtar kelime / doorway sayfası açmayın. Yeni içerik için GSC Performance verisini bekleyin.

---

## Canlı teknik doğrulama

Deploy sonrası tarayıcıda kontrol edin:

1. `https://www.ozluotomotiv.com` — HTTPS ve doğru host
2. `https://www.ozluotomotiv.com/robots.txt` — sitemap satırı
3. `https://www.ozluotomotiv.com/sitemap.xml` — 7 rota listelenmeli

Vercel ortam değişkeni:

`NEXT_PUBLIC_SITE_URL=https://www.ozluotomotiv.com`

(Scheme zorunlu; `localhost` production’da yasak.)

İsteğe bağlı yeniden doğrulama:

`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<Search Console HTML meta token>`

Token yalnızca meta `content` değeridir; tüm `<meta …>` etiketi değil.

---

## Google Search Console

Property zaten ekliyse doğrudan sitemap adımına geçin.

### Sitemap gönderimi

1. [Google Search Console](https://search.google.com/search-console) → doğru property  
   Tercihen `https://www.ozluotomotiv.com` veya Domain property `ozluotomotiv.com`
2. Sol menü → **Sitemaps**
3. Sitemap URL alanına yalnızca şunu yazın:

   `https://www.ozluotomotiv.com/sitemap.xml`

4. **Submit** → durum “Success” / “Başarılı” olana kadar izleyin

### URL Inspection (öncelikli sayfalar)

Üst arama kutusuna tam URL yapıştırıp mümkünse **Request indexing / Dizin oluşturmayı iste**:

| Öncelik | URL |
|--------|-----|
| 1 | `https://www.ozluotomotiv.com/` |
| 2 | `https://www.ozluotomotiv.com/hyundai-yedek-parca` |
| 3 | `https://www.ozluotomotiv.com/kia-yedek-parca` |
| 4 | `https://www.ozluotomotiv.com/cikma-yedek-parca` |
| 5 | `https://www.ozluotomotiv.com/iletisim` |
| 6 | `https://www.ozluotomotiv.com/parca-sorgula` |
| 7 | `https://www.ozluotomotiv.com/hakkimizda` |

Not: Google günlük istek kotası koyabilir; kritik sayfalardan başlayın.

### Sonraki izleme (1–4 hafta)

- **Pages / Sayfalar** — indeks hataları
- **Performance / Performans** — sorgular, tıklama, gösterim
- Yerel sorgular (ör. “konya hyundai yedek parça”) görünmeye başlarsa içeriği buna göre genişletin; tahminle yeni sayfa açmayın

---

## Google İşletme Profili ↔ site uyumu

Kaynak gerçek: `src/config/site.ts` ve canlı `/iletisim` sayfası.

### NAP / web / saat checklist

- [ ] İşletme adı: **Özlü Otomotiv** (site ile aynı yazım)
- [ ] Adres: Fatih Mahallesi, Gündüz Sokak No:57, 42100 Selçuklu / Konya
- [ ] Telefonlar: 0532 360 7958 ve 0549 423 17 17 (GBP’de de aynı)
- [ ] Web sitesi: `https://www.ozluotomotiv.com` (http veya yanlış www yok)
- [ ] Çalışma saatleri site ile birebir (Pazar kapalı; Perşembe 09:00–17:00; Cumartesi 09:00–14:00)
- [ ] Ana kategori: otomotiv yedek parçası / Auto parts store benzeri doğru kategori
- [ ] Hizmetler: Hyundai, Kia, orijinal sıfır, orijinal çıkma (stok/fiyat uydurmayın)
- [ ] Güncel mağaza ve parça fotoğrafları
- [ ] Sahte yorum / rating satın almayın

### Resmi Maps yer linki (site JSON-LD `hasMap`)

1. Google Maps veya GBP → işletme → **Paylaş** → yer linkini kopyalayın  
   (tercihen `maps.app.goo.gl/…` veya `google.com/maps/place/…`)
2. `src/config/site.ts` içinde `googleMapsUrl` alanına yapıştırın (şu an `null`)
3. Deploy edin — `AutoPartsStore` structured data `hasMap` alır; iletişim harita/linkleri resmi yere bağlanır

Koordinat (`geo`) yalnızca doğrulanmış lat/lng varsa eklenir; uydurulmaz.

---

## Hedef anahtar kümeleri (içerik rehberi)

Araştırma başlangıç noktaları — sayfada mekanik tekrar yok:

- konya hyundai yedek parça / konya hyundai çıkma parça
- konya kia yedek parça / konya kia çıkma parça
- konya çıkma parça / orijinal çıkma parça
- özlü otomotiv / özlü otomotiv konya

Mevcut rotalar yeterlidir. Model veya mahalle başına ince landing page üretmeyin.
