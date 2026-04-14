export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: "tr" | "ar" }>;
}) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fbff,#eef2ff)] px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className={isArabic ? "text-right" : "text-left"}>
          <h1 className="text-3xl font-bold text-slate-900">
            {isArabic ? "قريبًا" : "Yakında"}
          </h1>
          <p className="mt-4 text-slate-600 leading-8">
            {isArabic
              ? "سيتم إضافة نظام دخول الطلاب لاحقًا. حاليًا يمكنكم إرسال طلب التسجيل عبر صفحة التسجيل."
              : "Öğrenci giriş sistemi yakında eklenecek. Şimdilik kayıt başvurusunu kayıt sayfası üzerinden gönderebilirsiniz."}
          </p>
        </div>
      </div>
    </main>
  );
}