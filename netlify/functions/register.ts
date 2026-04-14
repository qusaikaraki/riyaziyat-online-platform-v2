import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL;

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const body = JSON.parse(event.body || "{}");

    const {
      studentName,
      parentName,
      email,
      phone,
      grade,
      language,
      notes,
    } = body;

    if (!studentName || !parentName || !email || !phone || !grade || !language) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Eksik alanlar var." }),
      };
    }

    if (!adminEmail) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "ADMIN_EMAIL tanımlı değil." }),
      };
    }

    if (!process.env.RESEND_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "RESEND_API_KEY tanımlı değil." }),
      };
    }

    const html = `
      <h2>Yeni Öğrenci Başvurusu</h2>
      <p><strong>Öğrenci adı:</strong> ${studentName}</p>
      <p><strong>Veli adı:</strong> ${parentName}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Sınıf:</strong> ${grade}</p>
      <p><strong>Tercih edilen dil:</strong> ${language}</p>
      <p><strong>Notlar:</strong> ${notes || "-"}</p>
    `;

    const result = await resend.emails.send({
      from: "Riyaziyat Academy <onboarding@resend.dev>",
      to: adminEmail,
      subject: `Yeni kayıt başvurusu - ${studentName}`,
      html,
      replyTo: email,
    });

    console.log("Resend result:", JSON.stringify(result, null, 2));

    if (result.error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "E-posta gönderilemedi.",
          details: result.error,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        id: result.data?.id ?? null,
      }),
    };
  } catch (error) {
    console.error("Register function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Sunucu hatası oluştu." }),
    };
  }
};