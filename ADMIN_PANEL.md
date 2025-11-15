# Admin Panel Kurulum Rehberi

## ✅ Adım 3 Tamamlandı!

Tam özellikli admin paneli ile içerik yönetim sistemi başarıyla oluşturuldu.

## 📋 Oluşturulan Sayfalar

### 1. Admin Login (`/admin/login`)
- Modern, responsive giriş sayfası
- Bootstrap 5 ile tasarım
- AJAX ile form gönderimi
- Hata mesajı gösterimi

### 2. Admin Dashboard (`/admin`)
- İstatistik kartları
- Hızlı eylem butonları
- Son haberler listesi
- Kullanıcı bilgisi gösterimi

### 3. Yeni Haber Ekleme (`/admin/articles/new`)
- **Başlık** - Maksimum 200 karakter
- **Kategori** - 9 kategori seçeneği
- **Özet** - Maksimum 300 karakter
- **İçerik** - TinyMCE zengin metin editörü
- **Resim Yükleme** - Önizleme ile
- **Yazar** - Otomatik dolu
- **Etiketler** - Virgülle ayrılmış
- **Yayınla/Taslak** - Checkbox
- **Öne Çıkan** - Checkbox

### 4. Haber Listesi (`/admin/articles`)
- DataTables ile tablo
- Arama, filtreleme, sayfalama
- Resim önizleme
- Durum badges (Yayında/Taslak/Öne Çıkan)
- Görüntülenme sayısı
- Düzenleme/Silme butonları

## 🎨 Özellikler

### UI/UX
- ✅ Bootstrap 5 framework
- ✅ Font Awesome ikonlar
- ✅ Kırmızı-beyaz Hataylım teması
- ✅ Responsive tasarım
- ✅ Modern kartlar ve shadows
- ✅ Sidebar navigasyon

### Fonksiyonalite
- ✅ TinyMCE WYSIWYG editör
- ✅ Resim yükleme ve önizleme (5MB limit)
- ✅ DataTables ile tablo yönetimi
- ✅ AJAX form gönderimi
- ✅ Flash mesajları (success/error)
- ✅ Türkçe dil desteği

### Güvenlik
- ✅ Passport.js authentication
- ✅ `isAuthenticated` middleware koruması
- ✅ `isAdmin` yetki kontrolü
- ✅ Session yönetimi
- ✅ Multer ile güvenli dosya yükleme

## 🚀 Kullanım

### 1. Server'ı Başlat
```powershell
npm run dev
```

### 2. Admin Kullanıcı Oluştur (İlk kez)
```powershell
npm run create-admin
```

### 3. Admin Paneline Giriş
```
URL: http://localhost:3000/admin/login
Kullanıcı: admin
Şifre: admin123
```

### 4. Yeni Haber Ekle

1. Admin paneline giriş yap
2. "Yeni Haber Ekle" menüsüne tıkla
3. Formu doldur:
   - Başlık gir
   - Kategori seç
   - Özet yaz (maksimum 300 karakter)
   - İçeriği zengin metin editöründe oluştur
   - Resim yükle (opsiyonel)
   - Etiketleri virgülle ayır
   - "Hemen Yayınla" işaretle
4. "Haberi Kaydet" butonuna tıkla

## 📁 Dosya Yapısı

```
views/admin/
├── layout.ejs           # Ana layout şablonu (sidebar + topbar)
├── login.ejs            # Giriş sayfası
├── dashboard.ejs        # Ana panel sayfası
├── add-article.ejs      # Haber ekleme formu
└── articles.ejs         # Haber listesi tablosu

routes/
├── admin.js             # Admin route'ları
├── auth.js              # Authentication route'ları
└── articles.js          # Article API route'ları

middleware/
└── auth.js              # Authentication middleware'leri
```

## 🎯 Admin Panel Endpoint'leri

| Endpoint | Method | Açıklama | Koruma |
|----------|--------|----------|---------|
| `/admin` | GET | Dashboard | isAuthenticated |
| `/admin/login` | GET | Giriş sayfası | Public |
| `/admin/logout` | GET | Çıkış | Public |
| `/admin/articles` | GET | Haber listesi | isAuthenticated |
| `/admin/articles/new` | GET | Yeni haber formu | isAuthenticated |
| `/admin/articles` | POST | Haber kaydetme | isAuthenticated |
| `/admin/users` | GET | Kullanıcı yönetimi | isAdmin |
| `/admin/settings` | GET | Ayarlar | isAdmin |

## 📸 Resim Yükleme

### Konfigürasyon
- **Klasör:** `public/uploads/`
- **Format:** JPG, PNG, WebP
- **Maksimum Boyut:** 5MB
- **İsimlendirme:** `news-{timestamp}-{random}.ext`

### Örnek:
```
public/uploads/news-1731628800000-123456789.jpg
```

## 🔧 TinyMCE Editör

### Özellikler:
- Görsel ve kod görünümü
- Medya ekleme (resim, video)
- Tablo oluşturma
- Liste ve indent
- Link ekleme
- Karakter sayısı
- Fullscreen mod

### Dil:
Türkçe (`tr_TR`)

## 📊 DataTables

### Özellikler:
- Arama
- Sıralama (tüm kolonlar)
- Sayfalama (25 kayıt/sayfa)
- Türkçe dil paketi
- Responsive

## ⚙️ Kategoriler

1. **Siyaset** - `siyaset`
2. **Spor** - `spor`
3. **Sanat** - `sanat`
4. **Genel** - `genel`
5. **Özel Haber** - `ozel-haber`
6. **Video Haber** - `video-haber`
7. **Başarılı Hataylılar** - `basarili-hataylilar`
8. **Eleman ve İş Arayanlar** - `eleman-is-arayan`
9. **Yazı Yorum** - `yazi-yorum`

## 🎨 Renk Paleti

```css
--hataylim-red: #dc3545
--hataylim-dark-red: #b71c1c
```

## 📝 Sonraki Adımlar

✅ **Adım 1:** Backend İskeleti (TAMAMLANDI)
✅ **Adım 2:** Passport.js Auth (TAMAMLANDI)
✅ **Adım 3:** Admin Panel UI (TAMAMLANDI)
⏭️ **Adım 4:** Haber düzenleme sayfası
⏭️ **Adım 5:** Frontend sayfalarını dinamikleştir
⏭️ **Adım 6:** Kullanıcı yönetimi arayüzü
⏭️ **Adım 7:** Production deployment

## 🐛 Hata Ayıklama

### MongoDB bağlantı hatası
```powershell
# MongoDB servisini başlat (Windows)
net start MongoDB
```

### Port 3000 kullanımda
```powershell
# .env dosyasında PORT değiştir
PORT=3001
```

### Resim yüklenmiyor
```powershell
# public/uploads/ klasörünün yazma iznini kontrol et
# Klasörü manuel oluştur:
New-Item -ItemType Directory -Path "public\uploads" -Force
```

---

**Başarıyla tamamlandı!** 🎉

Admin paneliniz kullanıma hazır. Artık haber ekleyebilir, düzenleyebilir ve yönetebilirsiniz.
