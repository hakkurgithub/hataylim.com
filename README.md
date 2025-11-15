# Hataylım Gazetesi - GitHub CMS Sistemi

## 📰 Proje Hakkında
Hataylım Gazetesi, GitHub'ı veritabanı olarak kullanan modern bir online gazete platformudur. Haberler, görseller ve içerikler GitHub repository'de saklanır ve admin paneli üzerinden yönetilir.

## 🏗️ Mimari Yapı

### Veritabanı Sistemi (GitHub)
```
hataylim-data/
├── news/
│   ├── siyaset/
│   │   └── 2024-11-15-haber-id.json
│   ├── spor/
│   ├── sanat/
│   ├── genel/
│   └── ozel-haber/
├── images/
│   ├── news/
│   ├── featured/
│   └── categories/
└── config/
    ├── categories.json
    └── settings.json
```

## 🔐 Admin Kullanıcı Sistemi

**Admin Kullanıcı:**
- Kullanıcı Adı: `admin`
- Şifre: Ilk kurulumda ayarlanacak
- Token: GitHub Personal Access Token

## 🚀 Kurulum

### 1. GitHub Repository Oluştur
```bash
# Yeni repo oluştur: hataylim-data
# Public veya Private olabilir
```

### 2. GitHub Token Al
1. GitHub Settings → Developer settings → Personal access tokens
2. "Generate new token (classic)"
3. Permissions: `repo`, `workflow`
4. Token'ı kopyala ve güvenli sakla

### 3. Yapılandırma
`config.js` dosyasını düzenle:
```javascript
GITHUB_USERNAME: 'kullaniciadi'
GITHUB_REPO: 'hataylim-data'
GITHUB_TOKEN: 'ghp_xxxxxxxxxxxxx'
```

## 📝 Kullanım

### Admin Paneline Giriş
1. `admin.html` sayfasını aç
2. Admin şifresini gir
3. Haber ekle, düzenle veya sil

### Haber Ekleme
1. Admin panelden "Yeni Haber" butonuna tık
2. Kategori seç
3. Başlık, içerik, özet gir
4. Resim yükle (otomatik GitHub'a yüklenir)
5. Yayınla

### Resim Yönetimi
- Resimler otomatik `images/news/` klasörüne yüklenir
- Format: `YYYY-MM-DD-haber-id-image.jpg`
- URL: `https://raw.githubusercontent.com/username/hataylim-data/main/images/news/...`

## 🔧 Teknolojiler

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Veritabanı:** GitHub (JSON files)
- **Image Storage:** GitHub Repository
- **API:** GitHub REST API
- **Auth:** GitHub Personal Access Token

## 📦 Veri Yapısı

### Haber JSON Formatı
```json
{
  "id": "2024-11-15-antakya-belediye",
  "title": "Antakya Belediyesi Yeni Proje Açıkladı",
  "slug": "antakya-belediye-yeni-proje",
  "category": "siyaset",
  "summary": "Kısa özet metni...",
  "content": "Tam haber içeriği...",
  "image": "images/news/2024-11-15-antakya-belediye.jpg",
  "author": "Erdahan Polat",
  "date": "2024-11-15T10:30:00Z",
  "views": 0,
  "featured": false,
  "tags": ["belediye", "antakya", "proje"]
}
```

## 🎯 Özellikler

✅ GitHub üzerinde tam veri kontrolü
✅ Admin paneli ile kolay içerik yönetimi
✅ Otomatik resim yükleme ve optimize etme
✅ Kategori bazlı haber organizasyonu
✅ Responsive tasarım
✅ SEO optimize
✅ Günlük gazete yapısı
✅ Manuel onay sistemi (draft/published)

## 📄 Lisans
© 2024 Hataylım Gazetesi - Tüm hakları saklıdır.
