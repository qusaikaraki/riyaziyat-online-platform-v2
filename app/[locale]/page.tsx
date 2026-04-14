import Link from "next/link";
import { Brain, CheckCircle2, Mail, Phone, Quote, ShieldCheck, Star, Users, BookOpen, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/SectionTitle";
import { getDictionary, services, pricing, testimonials, faqs, adminFlow } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n";

export default async function LandingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const isAr = locale === "ar";

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
      <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className={isAr ? "text-right" : "text-left"}>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-brand-700">
            <Brain className="h-4 w-4" />
            {dict.hero.badge}
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            {dict.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{dict.hero.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/${locale}/register`}><Button>{dict.hero.ctaPrimary}</Button></Link>
            <Link href={`/${locale}/login`}><Button variant="outline">{dict.hero.ctaSecondary}</Button></Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {["TR + AR", "Admin approval", "Student dashboard"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-slate-950 via-brand-900 to-violet-700 p-8 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-blue-200">{siteConfig.siteName}</div>
                  <div className="mt-2 text-3xl font-bold">
                    {isAr ? "منصة تعليم منظمة وقابلة للتوسع" : "Ölçeklenebilir ve düzenli eğitim platformu"}
                  </div>
                </div>
                <ShieldCheck className="h-8 w-8" />
              </div>
            </div>
            <div className="grid gap-4 bg-slate-50 p-6 sm:grid-cols-2">
              {[
                { icon: Users, title: isAr ? "إدارة الطلاب" : "Öğrenci yönetimi", text: isAr ? "لوحة دخول وحالة موافقة" : "Giriş ve onay durumu" },
                { icon: BookOpen, title: isAr ? "متابعة الدروس" : "Ders takibi", text: isAr ? "جاهز للتوسع إلى المحتوى" : "İçerik eklemeye hazır" },
                { icon: GraduationCap, title: isAr ? "واجهة احترافية" : "Kurumsal arayüz", text: isAr ? "ثنائية اللغة ومريحة" : "İki dilli ve güven veren" },
                { icon: Mail, title: isAr ? "إشعار بريد" : "E-posta bildirimi", text: isAr ? "يصل الطلب إلى المدير" : "Başvuru admin mailine düşer" }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-blue-100 p-2 text-brand-700"><Icon className="h-5 w-5" /></div>
                      <div className="font-semibold">{item.title}</div>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="services" className="py-16">
        <SectionTitle title={dict.sections.services} align={isAr ? "right" : "left"} />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((item) => (
            <Card key={item.titleTr}>
              <CardContent>
                <h3 className="text-xl font-bold">{isAr ? item.titleAr : item.titleTr}</h3>
                <p className="mt-3 text-slate-600">{isAr ? item.textAr : item.textTr}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="py-16">
        <SectionTitle title={dict.sections.pricing} align={isAr ? "right" : "left"} />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {pricing.map((item, index) => (
            <Card key={item.nameTr} className={index === 1 ? "ring-2 ring-blue-200" : ""}>
              <CardContent>
                <div className="text-2xl font-bold">{isAr ? item.nameAr : item.nameTr}</div>
                <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                  {isAr ? item.noteAr : item.noteTr}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="teacher" className="py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="grid gap-6 md:grid-cols-[200px_1fr]">
              <div className="flex min-h-44 items-center justify-center rounded-[28px] bg-gradient-to-br from-slate-950 via-brand-900 to-violet-700 text-4xl font-black text-white">
                M
              </div>
              <div className={isAr ? "text-right" : "text-left"}>
                <SectionTitle title={dict.sections.teacher} align={isAr ? "right" : "left"} />
                <p className="prose-soft mt-4">
                  {isAr
                    ? "هنا تضيف سيرتك الذاتية، خبرتك، فلسفتك في التعليم، والسبب الذي يجعل الأهالي يثقون بك."
                    : "Buraya biyografin, deneyimin, eğitim yaklaşımın ve seni güçlü kılan değer önerin eklenecek."}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className={isAr ? "text-right" : "text-left"}>
              <SectionTitle title={dict.sections.adminFlow} align={isAr ? "right" : "left"} />
              <div className="mt-6 space-y-4">
                {adminFlow.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">{index + 1}</div>
                    <div className="pt-1 text-slate-700">{isAr ? step.ar : step.tr}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="testimonials" className="py-16">
        <SectionTitle title={dict.sections.testimonials} align={isAr ? "right" : "left"} />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {testimonials.map((item) => (
            <Card key={item.nameTr}>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-blue-100 p-3 text-brand-700"><Quote className="h-5 w-5" /></div>
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                </div>
                <p className="mt-5 text-slate-600">{isAr ? item.textAr : item.textTr}</p>
                <div className="mt-4 font-semibold">{isAr ? item.nameAr : item.nameTr}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="faq" className="py-16">
        <SectionTitle title={dict.sections.faq} align={isAr ? "right" : "left"} />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {faqs.map((item) => (
            <Card key={item.qTr}>
              <CardContent className={isAr ? "text-right" : "text-left"}>
                <div className="text-lg font-bold">{isAr ? item.qAr : item.qTr}</div>
                <div className="mt-3 text-slate-600">{isAr ? item.aAr : item.aTr}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="contact" className="py-16">
        <SectionTitle title={dict.sections.contact} align={isAr ? "right" : "left"} />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-emerald-600" /> {siteConfig.whatsappNumber}</div>
              <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-brand-700" /> {siteConfig.supportEmail}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4">
              <Link href={`/${locale}/register`}><Button>{dict.hero.ctaPrimary}</Button></Link>
              <Link href={`/${locale}/login`}><Button variant="outline">{dict.hero.ctaSecondary}</Button></Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="rounded-[32px] bg-slate-950 px-6 py-10 text-white">
        <div className="text-2xl font-bold">{siteConfig.siteName}</div>
        <p className="mt-3 max-w-2xl text-slate-400">{dict.footer.tagline}</p>
      </footer>
    </main>
  );
}
