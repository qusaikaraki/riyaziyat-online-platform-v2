import type { Handler } from "@netlify/functions";
import { buildMathTutorSystemPrompt } from "../../lib/ai-prompts";

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || "gpt-5.4-mini";

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "OPENAI_API_KEY tanımlı değil." }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const {
      question,
      topic,
      level,
      language,
      imageBase64,
      imageMimeType,
    } = body;

    if (!question && !imageBase64) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Soru veya görsel gerekli." }),
      };
    }

    const systemPrompt = buildMathTutorSystemPrompt({
      level: level || "5",
      language: language || "tr",
      topic,
    });

    const content: any[] = [];

    if (question) {
      content.push({
        type: "input_text",
        text: question,
      });
    }

    if (imageBase64 && imageMimeType) {
      content.push({
        type: "input_image",
        image_url: `data:${imageMimeType};base64,${imageBase64}`,
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "system",
            content: [{ type: "input_text", text: systemPrompt }],
          },
          {
            role: "user",
            content,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "AI yanıtı alınamadı.",
          details: data,
        }),
      };
    }

    const outputText =
      data.output_text ||
      data.output
        ?.flatMap((item: any) => item.content || [])
        ?.filter((c: any) => c.type === "output_text")
        ?.map((c: any) => c.text)
        ?.join("\n\n") ||
      "";

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        answer: outputText,
      }),
    };
  } catch (error) {
    console.error("math-assistant function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Sunucu hatası oluştu.",
      }),
    };
  }
};