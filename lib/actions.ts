"use server";

import { z } from "zod";
import { Resend } from "resend";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const registerSchema = z.object({
  studentName: z.string().min(2),
  parentName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  grade: z.string().min(1),
  preferredLanguage: z.string().min(1),
  notes: z.string().optional()
});

export type RegisterResult = { success: boolean; message: string };

export async function submitRegistration(formData: FormData): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse({
    studentName: formData.get("studentName"),
    parentName: formData.get("parentName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    grade: formData.get("grade"),
    preferredLanguage: formData.get("preferredLanguage"),
    notes: formData.get("notes")
  });

  if (!parsed.success) {
    return { success: false, message: "Form validation failed." };
  }

  const supabaseAdmin = createSupabaseAdminClient();

  const randomPassword = crypto.randomUUID().replace(/-/g, "").slice(0, 12) + "Aa1!";
  const { data: invitedUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: parsed.data.email,
    password: randomPassword,
    email_confirm: true,
    user_metadata: {
      role: "student"
    }
  });

  if (authError) {
    return { success: false, message: authError.message };
  }

  const { error: profileError } = await supabaseAdmin.from("student_profiles").upsert({
    user_id: invitedUser.user.id,
    student_name: parsed.data.studentName,
    parent_name: parsed.data.parentName,
    phone: parsed.data.phone,
    grade: parsed.data.grade,
    preferred_language: parsed.data.preferredLanguage,
    notes: parsed.data.notes ?? "",
    status: "pending"
  });

  if (profileError) {
    return { success: false, message: profileError.message };
  }

  if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Riyaziyat Online <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: "Yeni öğrenci başvurusu",
      html: `
        <h2>Yeni öğrenci başvurusu</h2>
        <p><strong>Öğrenci:</strong> ${parsed.data.studentName}</p>
        <p><strong>Veli:</strong> ${parsed.data.parentName}</p>
        <p><strong>E-posta:</strong> ${parsed.data.email}</p>
        <p><strong>Telefon:</strong> ${parsed.data.phone}</p>
        <p><strong>Sınıf:</strong> ${parsed.data.grade}</p>
        <p><strong>Dil:</strong> ${parsed.data.preferredLanguage}</p>
        <p><strong>Not:</strong> ${parsed.data.notes ?? "-"}</p>
      `
    });
  }

  return { success: true, message: "Registration submitted." };
}

export async function loginStudent(formData: FormData): Promise<RegisterResult> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Logged in." };
}

export async function approveStudent(userId: string): Promise<RegisterResult> {
  const supabaseAdmin = createSupabaseAdminClient();
  const { error } = await supabaseAdmin
    .from("student_profiles")
    .update({ status: "approved" })
    .eq("user_id", userId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Approved." };
}

export async function rejectStudent(userId: string): Promise<RegisterResult> {
  const supabaseAdmin = createSupabaseAdminClient();
  const { error } = await supabaseAdmin
    .from("student_profiles")
    .update({ status: "rejected" })
    .eq("user_id", userId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Rejected." };
}
