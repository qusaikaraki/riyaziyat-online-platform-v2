import { requireApprovedStudent } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n";

export default async function DashboardPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const user = await requireApprovedStudent(locale);
  const isAr = locale === "ar";

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-bold">{isAr ? "لوحة الطالب" : "Öğrenci Paneli"}</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Card><CardContent><div className="text-lg font-semibold">{isAr ? "الحساب" : "Hesap"}</div><p className="mt-2 text-slate-600">{user.email}</p></CardContent></Card>
        <Card><CardContent><div className="text-lg font-semibold">{isAr ? "الدروس" : "Dersler"}</div><p className="mt-2 text-slate-600">{isAr ? "Bu alan sonraki sürümde ders takvimi için kullanılacak." : "Bu alan sonraki sürümde ders takvimi için kullanılacak."}</p></CardContent></Card>
        <Card><CardContent><div className="text-lg font-semibold">{isAr ? "الواجبات" : "Ödevler"}</div><p className="mt-2 text-slate-600">{isAr ? "İleride görev ve dosya yönetimi burada olacak." : "İleride görev ve dosya yönetimi burada olacak."}</p></CardContent></Card>
      </div>
    </main>
  );
}
