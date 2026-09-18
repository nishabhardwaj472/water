import {
  Wrench,
  Settings,
  ShieldCheck,
  RefreshCw,
  Filter,
  Building2,
  ArrowRight,
} from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: typeof Wrench;
}

const services: Service[] = [
  {
    title: "RO Installation",
    description:
      "Professional installation of all RO purifier models with proper plumbing and testing.",
    icon: Wrench,
  },
  {
    title: "RO Repair",
    description:
      "Quick and reliable repair service for all RO issues — leaks, low flow, or faulty parts.",
    icon: Settings,
  },
  {
    title: "RO Servicing",
    description:
      "Comprehensive servicing to keep your purifier performing at its best with thorough cleaning.",
    icon: ShieldCheck,
  },
  {
    title: "AMC",
    description:
      "Annual Maintenance Contracts for worry-free operation with scheduled visits and priority support.",
    icon: RefreshCw,
  },
  {
    title: "Filter Replacement",
    description:
      "Genuine filter and membrane replacement with original parts for optimal purification.",
    icon: Filter,
  },
  {
    title: "Commercial RO",
    description:
      "Installation and maintenance of high-capacity commercial RO systems for businesses.",
    icon: Building2,
  },
];

export default function Services() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-50 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide mb-4">
            OUR SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Complete RO Care Solutions
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            From installation to maintenance, we provide end-to-end services to
            keep your water purifier running flawlessly.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-7 border border-slate-100 hover:border-cyan-200 shadow-md shadow-slate-200/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {service.description}
                </p>

                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 hover:text-cyan-700 group-hover:gap-2.5 transition-all"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
