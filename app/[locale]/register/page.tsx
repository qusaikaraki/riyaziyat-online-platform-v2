import { Card, CardContent } from "@/components/ui/card";
import { RegisterForm } from "@/components/RegisterForm";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export default async function RegisterPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const isAr = locale === "ar";

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <Card>
        <CardContent className={isAr ? "text-right" : "text-left"}>
          <h1 className="text-3xl font-bold">{dict.auth.registerTitle}</h1>
          <p className="mt-3 text-slate-600">{dict.auth.registerDesc}</p>
          <div className="mt-8">
            <RegisterForm labels={dict.auth} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
