"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  locale: "tr" | "ar";
};

export default function RegisterForm({ locale }: Props) {
  const [form, setForm] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    grade: "",
    language: locale === "ar" ? "العربية" : "Türkçe",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const isArabic = locale === "ar";

  const labels = {
    title: isArabic ? "إنشاء طلب تسجيل" : "Kayıt başvurusu oluştur",
    subtitle: isArabic
      ? "يذهب الطلب أولًا إلى موافقة المدير، وبعد الموافقة يصبح الحساب مفعّلًا."
      : "Başvurunuz yöneticinin incelemesine gönderilir. Uygun görülürse sizinle iletişime geçilir.",
    studentName: isArabic ? "اسم الطالب" : "Öğrenci adı",
    parentName: isArabic ? "اسم ولي الأمر" : "Veli adı",
    email: isArabic ? "البريد الإلكتروني" : "E-posta",
    phone: isArabic ? "رقم الهاتف" : "Telefon",
    grade: isArabic ? "الصف" : "Sınıf",
    language: isArabic ? "اللغة المفضلة" : "Tercih edilen dil",
    notes: isArabic ? "ملاحظات إضافية" : "Ek notlar",
    submit: isArabic ? "إرسال الطلب" : "Başvuruyu gönder",
    success: isArabic
      ? "تم إرسال الطلب بنجاح. سيتم التواصل معكم قريبًا."
      : "Başvurunuz başarıyla gönderildi. En kısa sürede sizinle iletişime geçilecektir.",
    error: isArabic
      ? "حدث خطأ أثناء إرسال الطلب."
      : "Başvuru gönderilirken bir hata oluştu.",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/.netlify/functions/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      setSuccess(labels.success);
      setForm({
        studentName: "",
        parentName: "",
        email: "",
        phone: "",
        grade: "",
        language: locale === "ar" ? "العربية" : "Türkçe",
        notes: "",
      });
    } catch (err) {
      console.error(err);
      setError(labels.error);
    } finally {
      setLoading(false);
    }
  }

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <div className={isArabic ? "text-right" : "text-left"}>
        <h2 className="text-3xl font-bold text-slate-900">{labels.title}</h2>
        <p className="mt-3 text-slate-600">{labels.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            placeholder={labels.studentName}
            value={form.studentName}
            onChange={(e) => updateField("studentName", e.target.value)}
          />
          <Input
            placeholder={labels.parentName}
            value={form.parentName}
            onChange={(e) => updateField("parentName", e.target.value)}
          />
          <Input
            placeholder={labels.email}
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          <Input
            placeholder={labels.phone}
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
          <Input
            placeholder={labels.grade}
            value={form.grade}
            onChange={(e) => updateField("grade", e.target.value)}
          />
          <Input
            placeholder={labels.language}
            value={form.language}
            onChange={(e) => updateField("language", e.target.value)}
          />
        </div>

        <Textarea
          placeholder={labels.notes}
          className="min-h-[140px]"
          value={form.notes}
          onChange={(e) => updateField("notes", e.target.value)}
        />

        {success ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
            {success}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        ) : null}

        <div className={isArabic ? "flex justify-start" : "flex justify-end"}>
          <Button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-slate-900 hover:bg-slate-800 px-6"
          >
            {loading ? "..." : labels.submit}
          </Button>
        </div>
      </form>
    </div>
  );
}