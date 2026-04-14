import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { AdminReviewTable } from "@/components/AdminReviewTable";

export default async function AdminPage() {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();

  const { data: rows, error } = await supabase
    .from("student_profiles")
    .select("user_id, student_name, parent_name, phone, grade, preferred_language, status")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-bold text-slate-950">Admin Onay Paneli</h1>
      <p className="mt-3 text-slate-600">Pending kullanıcıları buradan onaylayabilir veya reddedebilirsin.</p>
      <div className="mt-8">
        {error ? <p className="text-red-600">{error.message}</p> : <AdminReviewTable rows={rows ?? []} />}
      </div>
    </main>
  );
}
