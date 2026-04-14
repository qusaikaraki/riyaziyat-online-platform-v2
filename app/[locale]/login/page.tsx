import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "@/components/LoginForm";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export default async function LoginPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  const dict = getDictionary(locale);
  const isAr = locale === "ar";

  return (
    <main className="mx-auto max-w-xl px-4 py-12 md:px-6">
      <Card>
        <CardContent className={isAr ? "text-right" : "text-left"}>
          <h1 className="text-3xl font-bold">{dict.auth.loginTitle}</h1>
          <p className="mt-3 text-slate-600">
            {query.status === "pending"
              ? isAr
                ? "الحساب ما زال بانتظار موافقة المدير."
                : "Hesap hâlâ yönetici onayı bekliyor."
              : dict.auth.registerDesc}
          </p>
          <div className="mt-8">
            <LoginForm labels={dict.auth} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
