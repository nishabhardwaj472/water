export const WHATSAPP_NUMBER = "91879699984";

export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function whatsappLink(message: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

export const COMPANY = {
  name: "AquaPure RO",
  phone: "+91 87969 9984",
  email: "care@aquapure-ro.com",
  address: "Plot 14, Industrial Estate, Pune, Maharashtra 411001",
};
