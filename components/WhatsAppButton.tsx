import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsappHref}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-4 text-sm font-semibold text-white shadow-2xl transition-transform hover:scale-105 hover:bg-emerald-600"
    >
      <MessageCircle className="h-5 w-5" />
      WhatsApp
    </a>
  );
}
