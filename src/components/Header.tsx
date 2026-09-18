import { useEffect, useState } from "react";
import { Droplets, Menu, X, MessageCircle, LogIn } from "lucide-react";
import { WHATSAPP_BASE_URL, COMPANY } from "@/config/site";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const navLinks = [
  { id: "home", label: "Home" },
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    if (id === "home") {
      onNavigate("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleCRMLogin = () => {
    setMobileOpen(false);
    onNavigate("crm-login");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-cyan-500/10"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Droplets className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </div>
            <div className="text-left">
              <span className="block text-lg md:text-xl font-bold text-slate-800 leading-tight">
                {COMPANY.name}
              </span>
              <span className="block text-[10px] md:text-xs text-cyan-600 font-medium tracking-wide">
                RO WATER PURIFIER
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === link.id
                    ? "text-cyan-700 bg-cyan-50"
                    : "text-slate-600 hover:text-cyan-600 hover:bg-cyan-50/50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleCRMLogin}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 border border-slate-200 hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all duration-200"
            >
              <LogIn className="w-4 h-4" />
              CRM Login
            </button>
            <a
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-cyan-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-1 bg-white border-t border-slate-100">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentPage === link.id
                  ? "text-cyan-700 bg-cyan-50"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleCRMLogin}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 border border-slate-200 hover:border-cyan-300 hover:text-cyan-600 transition-all"
            >
              <LogIn className="w-4 h-4" />
              CRM Login
            </button>
            <a
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
