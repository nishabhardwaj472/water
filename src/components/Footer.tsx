import { Droplets, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { WHATSAPP_BASE_URL, COMPANY } from "@/config/site";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">{COMPANY.name}</span>
            </div>
            <p className="text-sm leading-relaxed max-w-md mb-6">
              Your trusted partner for RO water purification solutions. We
              provide premium water purifiers, expert installation, and
              comprehensive service for homes and businesses.
            </p>
            <a
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with us
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    onNavigate("home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("products")}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("contact")}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("crm-login")}
                  className="hover:text-cyan-400 transition-colors"
                >
                  CRM Login
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-400" />
                <span>{COMPANY.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-400" />
                <span>{COMPANY.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-400" />
                <span>{COMPANY.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
