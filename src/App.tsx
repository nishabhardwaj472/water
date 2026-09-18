import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CrmLoginPage from "@/components/CrmLoginPage";

type Page = "home" | "crm-login";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === "/crm-login") {
        setPage("crm-login");
      } else {
        setPage("home");
      }
    };

    handlePopState();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (target: string) => {
    if (target === "crm-login") {
      setPage("crm-login");
      window.history.pushState({ page: "crm-login" }, "", "/crm-login");
    } else {
      setPage("home");
      if (window.location.pathname !== "/") {
        window.history.pushState({ page: "home" }, "", "/");
      }
    }
  };

  if (page === "crm-login") {
    return <CrmLoginPage onBack={() => navigate("home")} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={navigate} currentPage="home" />
      <main>
        <HeroSlider />
        <Products />
        <Services />
        <Contact />
      </main>
      <Footer onNavigate={navigate} />
      <WhatsAppFloat />
    </div>
  );
}
