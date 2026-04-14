import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export function getDictionary(locale: Locale) {
  return locale === "ar" ? ar : tr;
}

const tr = {
  nav: {
    home: "Ana Sayfa",
    services: "Hizmetler",
    pricing: "Paketler",
    teacher: "Öğretmen",
    testimonials: "Yorumlar",
    faq: "SSS",
    contact: "İletişim",
    login: "Giriş Yap",
    register: "Kayıt Oluştur"
  },
  hero: {
    badge: "Yapay zeka destekli profesyonel matematik eğitimi",
    title: "1. sınıftan 10. sınıfa kadar iki dilli online matematik platformu",
    description:
      "Türkçe ve Arapça destekli kurumsal sistem: kayıt, öğretmen onayı, öğrenci paneli, canlı ders, takip ve veli iletişimi tek yapıda.",
    ctaPrimary: "Kayıt Oluştur",
    ctaSecondary: "Öğrenci Girişi"
  },
  sections: {
    services: "Sunulan hizmetler",
    pricing: "Paketler",
    teacher: "Öğretmen tanıtımı",
    testimonials: "Öğrenci ve veli yorumları",
    faq: "Sık sorulan sorular",
    contact: "İletişim",
    adminFlow: "Onaylı kayıt sistemi"
  },
  auth: {
    registerTitle: "Kayıt başvurusu oluştur",
    registerDesc: "Başvuru önce yönetici onayına gider. Onay sonrası hesap aktif olur.",
    loginTitle: "Öğrenci girişi",
    email: "E-posta",
    password: "Şifre",
    studentName: "Öğrenci adı",
    parentName: "Veli adı",
    phone: "Telefon",
    grade: "Sınıf",
    preferredLanguage: "Tercih edilen dil",
    notes: "Ek notlar",
    submitRegister: "Başvuruyu gönder",
    submitLogin: "Giriş yap"
  },
  footer: {
    tagline: "Kurumsal ve iki dilli online matematik eğitimi platformu."
  }
};

const ar = {
  nav: {
    home: "الرئيسية",
    services: "الخدمات",
    pricing: "الباقات",
    teacher: "المعلم",
    testimonials: "الآراء",
    faq: "الأسئلة",
    contact: "التواصل",
    login: "تسجيل الدخول",
    register: "إنشاء تسجيل"
  },
  hero: {
    badge: "تعليم رياضيات احترافي مدعوم بالذكاء الاصطناعي",
    title: "من الصف الأول حتى الصف العاشر: منصة رياضيات أونلاين ثنائية اللغة",
    description:
      "نظام احترافي يدعم العربية والتركية ويجمع التسجيل، موافقة المعلم، لوحة الطالب، الدروس المباشرة، والمتابعة في تجربة واحدة.",
    ctaPrimary: "إنشاء تسجيل",
    ctaSecondary: "دخول الطالب"
  },
  sections: {
    services: "الخدمات المتوفرة",
    pricing: "الباقات",
    teacher: "نبذة عن المعلم",
    testimonials: "آراء الطلاب والأهالي",
    faq: "الأسئلة الشائعة",
    contact: "التواصل",
    adminFlow: "نظام التسجيل بالموافقة"
  },
  auth: {
    registerTitle: "إنشاء طلب تسجيل",
    registerDesc: "يذهب الطلب أولًا إلى موافقة المدير، وبعد الموافقة يصبح الحساب فعالًا.",
    loginTitle: "دخول الطالب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    studentName: "اسم الطالب",
    parentName: "اسم ولي الأمر",
    phone: "رقم الهاتف",
    grade: "الصف",
    preferredLanguage: "اللغة المفضلة",
    notes: "ملاحظات إضافية",
    submitRegister: "إرسال الطلب",
    submitLogin: "تسجيل الدخول"
  },
  footer: {
    tagline: "منصة احترافية ثنائية اللغة لتعليم الرياضيات أونلاين."
  }
};

export const services = [
  {
    titleTr: "Birebir Matematik Dersi",
    titleAr: "دروس رياضيات فردية",
    textTr: "Öğrenciye özel tempo, takip ve adım adım anlatım.",
    textAr: "شرح خاص بكل طالب مع متابعة دقيقة وخطوات واضحة."
  },
  {
    titleTr: "Küçük Grup Dersleri",
    titleAr: "دروس مجموعات صغيرة",
    textTr: "Benzer seviyedeki öğrenciler için motive edici yapı.",
    textAr: "بيئة مناسبة للطلاب المتقاربين في المستوى."
  },
  {
    titleTr: "Temel Güçlendirme",
    titleAr: "برنامج تأسيس وتقوية",
    textTr: "Eksik temeller için sistemli konu planı ve tekrar.",
    textAr: "خطة واضحة لسد الفجوات وبناء أساس قوي."
  }
];

export const pricing = [
  { nameTr: "Başlangıç", nameAr: "الأساسية", noteTr: "Fiyat sonra eklenecek", noteAr: "يضاف السعر لاحقًا" },
  { nameTr: "Standart", nameAr: "القياسية", noteTr: "Fiyat sonra eklenecek", noteAr: "يضاف السعر لاحقًا" },
  { nameTr: "Premium", nameAr: "المميزة", noteTr: "Fiyat sonra eklenecek", noteAr: "يضاف السعر لاحقًا" }
];

export const testimonials = [
  {
    nameTr: "Veli Yorumu",
    nameAr: "رأي ولي أمر",
    textTr: "Bu bölümde gerçek öğrenci ve veli yorumları gösterilecek.",
    textAr: "سيتم عرض آراء حقيقية للطلاب والأهالي في هذا القسم."
  },
  {
    nameTr: "Öğrenci Yorumu",
    nameAr: "رأي طالب",
    textTr: "Başarı hikâyeleri ve gelişim geri bildirimleri burada yer alacak.",
    textAr: "ستظهر هنا قصص النجاح وملاحظات التطور."
  }
];

export const faqs = [
  {
    qTr: "Dersler nasıl yapılır?",
    aTr: "Online görüşme platformu ve dijital tahta ile yapılır.",
    qAr: "كيف تتم الدروس؟",
    aAr: "تتم عبر منصة اجتماعات أونلاين مع سبورة رقمية."
  },
  {
    qTr: "Arapça ve Türkçe birlikte kullanılabilir mi?",
    aTr: "Evet, öğrencinin ihtiyacına göre iki dil desteklenir.",
    qAr: "هل يمكن استخدام العربية والتركية معًا؟",
    aAr: "نعم، يتم دعم اللغتين حسب حاجة الطالب."
  }
];

export const adminFlow = [
  {
    tr: "Öğrenci kayıt formunu doldurur.",
    ar: "يقوم الطالب بتعبئة نموذج التسجيل."
  },
  {
    tr: "Başvuru veritabanına pending olarak düşer.",
    ar: "يتم حفظ الطلب في قاعدة البيانات بحالة pending."
  },
  {
    tr: `Yöneticiye (${siteConfig.adminEmailPlaceholder}) bildirim e-postası gider.`,
    ar: `يصل إشعار بالبريد الإلكتروني إلى المدير (${siteConfig.adminEmailPlaceholder}).`
  },
  {
    tr: "Yönetici panelinden approved yapılınca kullanıcı giriş yapabilir.",
    ar: "بعد الموافقة من لوحة المدير يصبح المستخدم قادرًا على الدخول."
  }
];
