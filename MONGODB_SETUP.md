# Hataylım Gazetesi - MongoDB Kurulum Rehberi

## ⚠️ MongoDB Gerekli

Bu proje MongoDB veritabanı kullanıyor. MongoDB kurulu değil veya çalışmıyor.

## 🔧 Kurulum Seçenekleri

### Seçenek 1: MongoDB Community Server (Local - Önerilen)

1. **MongoDB İndir:**
   - URL: https://www.mongodb.com/try/download/community
   - Windows için MSI installer seç
   - Version: 7.0 veya üzeri

2. **Kur:**
   - Next → Next → Complete Installation
   - "Install MongoDB as a Service" işaretli bırak
   - "Install MongoDB Compass" (opsiyonel GUI)

3. **Servis Kontrolü:**
```powershell
# Servisin çalışıp çalışmadığını kontrol et
Get-Service -Name MongoDB

# Başlat (durmuşsa)
Start-Service -Name MongoDB

# Veya Windows Services'den "MongoDB Server" servisini başlat
```

4. **Test Et:**
```powershell
# MongoDB shell'i aç
mongosh

# Başarılı bağlantı sonrası:
# > show dbs
# > exit
```

### Seçenek 2: MongoDB Atlas (Cloud - Ücretsiz)

MongoDB Atlas, ücretsiz cloud veritabanı hizmeti sunar.

1. **Hesap Oluştur:**
   - URL: https://www.mongodb.com/cloud/atlas/register
   - Email ile ücretsiz kayıt ol

2. **Cluster Oluştur:**
   - "Build a Database" → "FREE" (M0 Sandbox)
   - Cloud Provider: AWS
   - Region: Frankfurt (en yakın)
   - Cluster Name: hataylim-cluster

3. **Database User Oluştur:**
   - Security → Database Access → Add New Database User
   - Username: `hataylim`
   - Password: Güvenli bir şifre (kopyala)
   - Privileges: Atlas Admin

4. **Network Access:**
   - Security → Network Access → Add IP Address
   - "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Connection String Al:**
   - Database → Connect → "Connect your application"
   - Driver: Node.js
   - Version: 5.5 or later
   - Connection string'i kopyala:
   ```
   mongodb+srv://hataylim:<password>@hataylim-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **`.env` Dosyasını Güncelle:**
```env
MONGODB_URI=mongodb+srv://hataylim:SIFRENIZ@hataylim-cluster.xxxxx.mongodb.net/hataylim-gazetesi?retryWrites=true&w=majority
```

## 🚀 Kurulum Sonrası

### 1. MongoDB Çalıştığını Doğrula

**Local MongoDB:**
```powershell
# MongoDB servisini kontrol et
Get-Service -Name MongoDB

# Veya MongoDB'ye bağlan
mongosh
```

**MongoDB Atlas:**
- Atlas dashboard'da cluster'ın "Active" olduğunu gör

### 2. Admin Kullanıcı Oluştur
```powershell
npm run create-admin
```

Başarılı çıktı:
```
✅ İlk admin kullanıcı başarıyla oluşturuldu!

📋 Giriş Bilgileri:
   Kullanıcı Adı: admin
   Şifre: admin123
   E-posta: admin@hataylim.com
```

### 3. Server'ı Başlat
```powershell
npm run dev
```

Başarılı çıktı:
```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║        🗞️  HATAYLIM GAZETESİ BACKEND SUNUCUSU  🗞️         ║
║                                                           ║
║  📡 Server: http://localhost:3000                         ║
║  📊 API: http://localhost:3000/api/articles               ║
║  🔐 Admin: http://localhost:3000/admin                    ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

✅ MongoDB Bağlantısı Başarılı: localhost:27017
```

### 4. Admin Paneline Giriş
```
URL: http://localhost:3000/admin/login
Kullanıcı: admin
Şifre: admin123
```

## 🐛 Sorun Giderme

### Hata: "buffering timed out after 10000ms"
**Sebep:** MongoDB çalışmıyor veya bağlantı hatası

**Çözüm:**
```powershell
# Local MongoDB servisini başlat
Start-Service -Name MongoDB

# Veya .env'de MongoDB Atlas connection string kullan
```

### Hata: "connect ECONNREFUSED 127.0.0.1:27017"
**Sebep:** MongoDB servisi durdurulmuş

**Çözüm:**
```powershell
# Windows Services'den "MongoDB Server" servisini başlat
# Veya PowerShell:
Start-Service -Name MongoDB
```

### Hata: "authentication failed"
**Sebep:** MongoDB Atlas şifresi yanlış

**Çözüm:**
- `.env` dosyasında `MONGODB_URI` connection string'ini kontrol et
- `<password>` yerine gerçek şifrenizi yazdığınızdan emin olun
- Şifrede özel karakterler varsa URL encode edin

## 💡 Öneriler

1. **Local Development:** MongoDB Community Server (kolay debug)
2. **Production:** MongoDB Atlas (güvenli, yedekli, ölçeklenebilir)
3. **Her iki durumda da:** Güçlü şifreler kullanın
4. **Atlas için:** IP whitelist'i production'da sıkılaştırın

## 📝 Sonraki Adım

MongoDB kurulumu tamamlandıktan sonra:
```powershell
npm run create-admin
npm run dev
```

---

**Sorularınız için:** README.md ve KURULUM.md dosyalarına bakın.
