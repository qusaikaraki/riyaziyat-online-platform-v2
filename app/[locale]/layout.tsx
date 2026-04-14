import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const rtl = locale === "ar";

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div>
            <div className="text-lg font-bold text-slate-900">{siteConfig.siteName}</div>
            <div className="text-xs text-slate-500">AI Supported Bilingual Math Education</div>
          </div>
          <LanguageSwitcher locale={locale as Locale} />
        </div>
      </header>
      {children}
      <WhatsAppButton />
    </div>
  );
}
