import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/tr/login");
  }

  return user;
}

export async function requireApprovedStudent(locale: "tr" | "ar") {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  const { data: profile } = await supabase
    .from("student_profiles")
    .select("status")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile || profile.status !== "approved") {
    redirect(`/${locale}/login?status=pending`);
  }

  return user;
}
