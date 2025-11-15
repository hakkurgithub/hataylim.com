# Hataylım Gazetesi - Vercel Deployment Kılavuzu

## 🚀 Vercel'e Deploy Etme

### 1. Vercel Dashboard'da Environment Variables Ekleyin

Vercel projenizin **Settings → Environment Variables** bölümünden şu değişkenleri ekleyin:

```
MONGODB_URI=mongodb+srv://hataylim:hataylim.com@hataylim-cluster.c81yp6d.mongodb.net/hataylim-gazetesi
SESSION_SECRET=hataylim-super-secret-key-2024-production
NODE_ENV=production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
PORT=3000
```

⚠️ **ÖNEMLİ:** `SESSION_SECRET`'ı production'da farklı ve güçlü bir değerle değiştirin!

### 2. Vercel JSON Yapılandırması

`vercel.json` dosyası zaten eklenmiş durumda:
- Node.js runtime kullanır
- Tüm route'ları `server.js`'e yönlendirir
- Static dosyalar `/public` klasöründen serve edilir

### 3. MongoDB Atlas Bağlantısı

MongoDB Atlas'ta:
1. **Network Access** → **IP Whitelist**'e `0.0.0.0/0` ekleyin (tüm IP'lere izin)
2. Veya Vercel'in IP aralıklarını ekleyin

### 4. Deploy Komutu

```bash
# Git'e commit edin
git add .
git commit -m "Vercel deployment yapılandırması"
git push

# Vercel otomatik olarak deploy edecek
```

### 5. İlk Admin Kullanıcısı Oluşturma

Vercel'de deploy edildikten sonra, Vercel CLI ile:

```bash
vercel env pull .env.production
npm run create-admin
```

Veya MongoDB Atlas'ta direkt admin kullanıcısı oluşturun.

### 6. Custom Domain (Opsiyonel)

Vercel Dashboard → Domains → Add Domain
Örnek: `hataylim.com` veya `www.hataylim.com`

## 🔧 Sorun Giderme

### MongoDB Bağlantı Hatası
- Network Access ayarlarını kontrol edin
- Connection string doğru mu?
- Environment variables Vercel'de doğru mu?

### 500 Internal Server Error
- Vercel Logs'u kontrol edin: `vercel logs`
- Environment variables eksik olabilir

### Static Dosyalar Yüklenmiyor
- `public/` klasörü doğru mu?
- `vercel.json` routes yapılandırması doğru mu?

## 📊 Performans

Vercel ücretsiz plan limitleri:
- 100 GB bandwidth/ay
- Serverless function execution: 100 GB-Hours/ay
- 12 saniye function timeout

Bu proje için yeterlidir.

## 🔗 Yararlı Linkler

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://cloud.mongodb.com

---

**Görüntü Gazetecilik Matbaacılık**
