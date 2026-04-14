"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  locale: "tr" | "ar";
};

const gradeOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export default function MathAssistant({ locale }: Props) {
  const isArabic = locale === "ar";

  const [grade, setGrade] = useState("5");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [imageMimeType, setImageMimeType] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const t = useMemo(
    () => ({
      title: isArabic ? "مساعد الرياضيات الذكي" : "Yapay Zekâ Matematik Asistanı",
      subtitle: isArabic
        ? "اكتب السؤال أو أرفق صورة، وسيقوم النظام بالشرح وفق الصف والمستوى."
        : "Sorunu yaz veya görsel ekle; sistem sınıf düzeyine göre anlatım yapsın.",
      grade: isArabic ? "الصف" : "Sınıf",
      topic: isArabic ? "الموضوع" : "Konu",
      topicPlaceholder: isArabic ? "مثال: الكسور" : "Örn: Kesirler",
      question: isArabic ? "السؤال" : "Soru",
      questionPlaceholder: isArabic
        ? "اكتب السؤال هنا..."
        : "Soruyu buraya yaz...",
      upload: isArabic ? "Görsel yükle" : "Görsel yükle",
      send: isArabic ? "ابدأ الشرح" : "Açıklamayı başlat",
      answer: isArabic ? "الشرح" : "Açıklama",
      error: isArabic ? "حدث خطأ." : "Bir hata oluştu.",
    }),
    [isArabic]
  );

  async function handleImageChange(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const [meta, base64] = result.split(",");
      const mime = meta.match(/data:(.*);base64/)?.[1] || "image/png";
      setImageMimeType(mime);
      setImageBase64(base64);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const res = await fetch("/.netlify/functions/math-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          topic,
          level: grade,
          language: locale,
          imageBase64,
          imageMimeType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      setAnswer(data.answer || "");
    } catch (e) {
      console.error(e);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className={isArabic ? "text-right" : "text-left"}>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t.title}</h1>
          <p className="mt-3 text-slate-600 leading-7">{t.subtitle}</p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              {t.grade}
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none"
            >
              {gradeOptions.map((g) => (
                <option key={g} value={g}>
                  {g}. {isArabic ? "الصف" : "sınıf"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              {t.topic}
            </label>
            <Input
              placeholder={t.topicPlaceholder}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            {t.question}
          </label>
          <Textarea
            className="min-h-[180px]"
            placeholder={t.questionPlaceholder}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            {t.upload}
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
          />
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        ) : null}

        <div className={isArabic ? "mt-6 flex justify-start" : "mt-6 flex justify-end"}>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-2xl bg-slate-900 hover:bg-slate-800 px-6"
          >
            {loading ? "..." : t.send}
          </Button>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">{t.answer}</h2>
        <div className="mt-4 whitespace-pre-wrap leading-8 text-slate-700">
          {answer || (isArabic ? "لم يتم إنشاء شرح بعد." : "Henüz açıklama üretilmedi.")}
        </div>
      </div>
    </div>
  );
}