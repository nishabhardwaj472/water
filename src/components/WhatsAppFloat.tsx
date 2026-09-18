import { MessageCircle } from "lucide-react";
import { WHATSAPP_BASE_URL } from "@/config/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_BASE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-xl shadow-green-500/40 group-hover:scale-110 transition-transform duration-200">
        <MessageCircle className="w-7 h-7 text-white" />
      </span>
    </a>
  );
}
