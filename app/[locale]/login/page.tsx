import MathAssistant from "@/components/MathAssistant";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: "tr" | "ar" }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fbff,#eef2ff)] px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <MathAssistant locale={locale} />
      </div>
    </main>
  );
}