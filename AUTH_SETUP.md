# Hataylım Gazetesi - Admin Kullanıcı Sistemi Kurulum

## ✅ Adım 2 Tamamlandı!

Passport.js ile güvenli admin kullanıcı kimlik doğrulama sistemi başarıyla eklendi.

## 🔐 Eklenen Özellikler

### 1. User Modeli
```javascript
{
  username: String (benzersiz),
  email: String (benzersiz),
  password: String (bcrypt ile hashlenmiş),
  role: ['admin', 'editor', 'author'],
  fullName: String,
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date
}
```

### 2. Authentication Endpoints

**🔓 Public (Herkes erişebilir):**
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/logout` - Çıkış yapma

**🔐 Protected (Giriş yapılması gerekli):**
- `GET /api/auth/me` - Mevcut kullanıcı bilgisi
- `PUT /api/auth/change-password` - Şifre değiştirme

**👑 Admin Only (Sadece admin):**
- `POST /api/auth/register` - Yeni kullanıcı oluşturma
- `GET /api/auth/users` - Tüm kullanıcıları listeleme
- `PUT /api/auth/users/:id` - Kullanıcı güncelleme

### 3. Middleware'ler
- `isAuthenticated` - Giriş kontrolü
- `isAdmin` - Admin yetkisi kontrolü
- `isEditor` - Editor/Admin yetkisi kontrolü
- `isNotAuthenticated` - Giriş yapılmamış kontrolü

## 🚀 Kurulum ve İlk Kullanım

### 1. Bağımlılıkları Yükle
```powershell
npm install
```

### 2. MongoDB'nin Çalıştığından Emin Ol
```powershell
# MongoDB servisinin çalışıp çalışmadığını kontrol et
# Windows Services'ten "MongoDB" servisine bakabilirsiniz
```

### 3. İlk Admin Kullanıcısını Oluştur
```powershell
npm run create-admin
```

Bu komut otomatik olarak şu bilgilerle bir admin oluşturur:
- **Kullanıcı Adı:** `admin`
- **Şifre:** `admin123`
- **E-posta:** `admin@hataylim.com`
- **Rol:** `admin`

⚠️ **ÖNEMLİ:** İlk girişten sonra mutlaka şifrenizi değiştirin!

### 4. Server'ı Başlat
```powershell
npm run dev
```

## 📖 API Kullanım Örnekleri

### Giriş Yapma
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Yanıt:**
```json
{
  "success": true,
  "message": "Giriş başarılı",
  "user": {
    "id": "...",
    "username": "admin",
    "email": "admin@hataylim.com",
    "role": "admin",
    "fullName": "Hataylım Admin"
  }
}
```

### Yeni Kullanıcı Ekleme (Admin Girişi Gerekli)
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json
Cookie: connect.sid=...

{
  "username": "erdahan",
  "email": "erdahan@hataylim.com",
  "password": "guvenli123",
  "fullName": "Erdahan Polat",
  "role": "editor"
}
```

### Mevcut Kullanıcı Bilgisi
```http
GET http://localhost:3000/api/auth/me
Cookie: connect.sid=...
```

### Şifre Değiştirme
```http
PUT http://localhost:3000/api/auth/change-password
Content-Type: application/json
Cookie: connect.sid=...

{
  "currentPassword": "admin123",
  "newPassword": "yeni-guvenli-sifre-2024"
}
```

### Çıkış Yapma
```http
POST http://localhost:3000/api/auth/logout
Cookie: connect.sid=...
```

## 🔒 Güvenlik Özellikleri

✅ **Bcrypt** ile şifre hashleme (10 salt rounds)
✅ **Passport.js** local strategy ile güvenli authentication
✅ **connect-mongo** ile MongoDB session store
✅ Session tabanlı kimlik doğrulama (7 gün geçerlilik)
✅ Role-based access control (admin, editor, author)
✅ Şifrelerin JSON çıktısında otomatik gizlenmesi
✅ Last login timestamp tracking

## 🎯 Rol Sistemi

| Rol | Yetkiler |
|-----|---------|
| **admin** | Tüm işlemler, kullanıcı yönetimi, sistem ayarları |
| **editor** | Haber CRUD, kendi ve başkalarının haberlerini düzenleme |
| **author** | Sadece kendi haberlerini ekleme/düzenleme |

## 🛡️ Middleware Kullanımı

### Route'larda Koruma Eklemek

```javascript
const { isAuthenticated, isAdmin } = require('./middleware/auth');

// Sadece giriş yapmış kullanıcılar
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

// Sadece admin
router.delete('/articles/:id', isAdmin, deleteArticle);

// Editor veya Admin
const { isEditor } = require('./middleware/auth');
router.post('/articles', isEditor, createArticle);
```

## 📝 Notlar

1. **Manuel Kayıt:** Sistem güvenliği için kayıt endpoint'i sadece admin kullanabilir
2. **Session Store:** MongoDB'de session bilgileri saklanır (server restart'ta oturum korunur)
3. **Cookie Güvenliği:** Production'da HTTPS kullanılmalı ve cookie secure flag eklenmelidir
4. **Şifre Politikası:** Minimum 6 karakter (artırılabilir)

## ⚠️ Production Önerileri

1. `.env` dosyasında güçlü `SESSION_SECRET` kullanın
2. HTTPS zorunlu yapın
3. Rate limiting ekleyin (express-rate-limit)
4. CORS ayarlarını sıkılaştırın
5. Admin şifresini mutlaka değiştirin
6. İki faktörlü kimlik doğrulama (2FA) ekleyin

---

## 📋 Sıradaki Adımlar

✅ **Adım 1:** Backend İskeleti (TAMAMLANDI)
✅ **Adım 2:** Passport.js Auth Sistemi (TAMAMLANDI)
⏭️ **Adım 3:** Admin Panel UI (EJS Views)
⏭️ **Adım 4:** Resim Yükleme ve Yönetimi
⏭️ **Adım 5:** Frontend-Backend Entegrasyonu
