import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
}

const slides: Slide[] = [
  {
    image:
      "https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    title: "Pure Water. Better Life.",
    subtitle:
      "Experience the purity of nature with advanced RO technology for your home and business.",
    cta: "Explore Products",
  },
  {
    image:
      "https://images.pexels.com/photos/36847822/pexels-photo-36847822.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    title: "Advanced RO Water Purification",
    subtitle:
      "Multi-stage filtration with RO, UV & UF technology that removes every impurity for crystal-clear, safe drinking water.",
    cta: "View Solutions",
  },
  {
    image:
      "https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    title: "Professional Installation & Service",
    subtitle:
      "Expert technicians for installation, repair, and maintenance — keeping your purifier running at peak performance.",
    cta: "Book a Service",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/50 to-cyan-900/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                index === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8 pointer-events-none absolute"
              }`}
            >
              {index === current && (
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/20 backdrop-blur-sm border border-cyan-300/30 mb-6">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-cyan-200 text-sm font-medium">
                      Trusted Water Purification Experts
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 max-w-xl">
                    {slide.subtitle}
                  </p>
                  <button
                    onClick={() =>
                      scrollTo(
                        index === 2 ? "services" : "products"
                      )
                    }
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-slate-900 bg-gradient-to-r from-cyan-300 to-cyan-400 hover:from-cyan-400 hover:to-cyan-500 shadow-2xl shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
                  >
                    {slide.cta}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              index === current
                ? "w-8 h-3 bg-cyan-400"
                : "w-3 h-3 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-5">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C320,120 720,0 1440,60 L1440,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
