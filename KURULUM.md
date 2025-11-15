# Hataylım Gazetesi Backend Kurulum Rehberi

## ✅ Adım 1 Tamamlandı!

Node.js + Express backend iskeletiniz başarıyla oluşturuldu. İşte yapılanlar:

### 📦 Oluşturulan Yapı

```
hataylim.com/
├── models/
│   └── Article.js              ✅ Mongoose Article modeli
├── routes/
│   └── articles.js             ✅ API route'ları
├── controllers/
│   └── articleController.js    ✅ İş mantığı
├── views/                      ✅ EJS şablonları için
├── public/
│   └── uploads/                ✅ Resim yükleme klasörü
├── config/
│   └── database.js             ✅ MongoDB bağlantı ayarları
├── server.js                   ✅ Ana server dosyası
├── package.json                ✅ Bağımlılıklar
├── .env.example                ✅ Çevre değişkenleri şablonu
└── .gitignore                  ✅ Git ignore dosyası
```

### 🎯 Article Modeli Özellikleri

```javascript
{
  title: String (zorunlu),
  slug: String (otomatik oluşur),
  content: String (zorunlu),
  summary: String (zorunlu),
  category: Enum [siyaset, spor, sanat, genel, ...],
  imageUrl: String,
  author: String,
  featured: Boolean,
  published: Boolean,
  views: Number,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 🔌 API Endpoint'leri

- `GET /api/articles` - Tüm haberler (filtreleme ile)
- `GET /api/articles/:id` - ID ile haber
- `GET /api/articles/slug/:slug` - Slug ile haber
- `GET /api/articles/category/:category` - Kategoriye göre haberler
- `POST /api/articles` - Yeni haber oluştur (resim yükleme ile)
- `PUT /api/articles/:id` - Haber güncelle
- `DELETE /api/articles/:id` - Haber sil

### 🚀 Kurulum Adımları

1. **Bağımlılıkları Yükle:**
```powershell
npm install
```

2. **MongoDB Kur (Windows):**
   - MongoDB Community Server indir: https://www.mongodb.com/try/download/community
   - Kur ve varsayılan ayarlarla başlat
   - Veya MongoDB Atlas (cloud) kullan

3. **Ortam Değişkenlerini Ayarla:**
```powershell
Copy-Item .env.example .env
```

`.env` dosyasını düzenle:
```env
MONGODB_URI=mongodb://localhost:27017/hataylim-gazetesi
PORT=3000
SESSION_SECRET=super-secret-key-buraya-gizli-bir-key-yazin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

4. **Server'ı Başlat:**
```powershell
npm start
```

Veya development modunda (otomatik yeniden başlatma):
```powershell
npm run dev
```

### 📖 Kullanım Örnekleri

**Yeni Haber Oluşturma (Postman/Insomnia ile):**
```
POST http://localhost:3000/api/articles
Content-Type: multipart/form-data

Body:
- title: "Antakya'da Yeni Proje"
- content: "Haber içeriği..."
- summary: "Kısa özet"
- category: "siyaset"
- image: [dosya seç]
- published: true
```

**Haberleri Listeleme:**
```
GET http://localhost:3000/api/articles?category=siyaset&published=true&limit=10
```

### 🔐 Admin Paneli

- URL: `http://localhost:3000/admin`
- Kullanıcı: `admin`
- Şifre: `.env` dosyasında belirttiğiniz şifre

### ⚠️ Önemli Notlar

1. **MongoDB** çalışıyor olmalı (`mongod` servisi)
2. **Port 3000** kullanılabilir olmalı
3. **Node.js 14+** gerekli
4. Production'da `ADMIN_PASSWORD`'ü mutlaka değiştirin
5. `.env` dosyasını asla Git'e eklemeyin

### 🎉 Test Et

Server başladıktan sonra:
- Ana Sayfa: http://localhost:3000
- API Test: http://localhost:3000/api/articles
- Admin: http://localhost:3000/admin

---

## 📋 Sıradaki Adımlar

✅ **Adım 1:** Backend İskeleti (TAMAMLANDI)
⏭️ **Adım 2:** EJS View'larını oluştur
⏭️ **Adım 3:** Admin paneli arayüzünü geliştir
⏭️ **Adım 4:** Frontend'i backend ile entegre et
⏭️ **Adım 5:** Production deployment
