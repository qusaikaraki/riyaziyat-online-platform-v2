# Riyaziyat Online Platform v2

Bu sürüm, projeyi üretim seviyesine daha yakın hale getirir:
- TR / AR iki dil
- Kayıt formu
- E-posta + şifre giriş
- Admin onay sistemi
- Öğrenci dashboard
- Supabase veri modeli
- Resend e-posta bildirimi

## 1. Kurulum

```bash
npm install
cp .env.example .env.local
```

`.env.local` içine gerçek değerleri gir:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
ADMIN_EMAIL=your-admin@email.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 2. Veritabanı

Supabase SQL editor içinde `supabase/schema.sql` çalıştır.

## 3. Çalıştırma

```bash
npm run dev
```

## 4. Admin akışı

- Öğrenci `/tr/register` veya `/ar/register` üzerinden başvurur.
- Admin mail alır.
- Admin `/admin` sayfasından başvuruyu approve eder.
- Öğrenci ancak bundan sonra dashboard’a girebilir.

## Notlar

Bu sürüm çalışan iskelet ve güçlü temel mimari verir. Canlıya almadan önce önerilen ek işler:
- gerçek logo ve öğretmen biyografisi
- e-posta şablonlarının özelleştirilmesi
- ders takvimi ve ödeme sistemi
- öğrenci içerik ve ödev yönetimi
- rate limiting ve güvenlik sertleştirmesi
