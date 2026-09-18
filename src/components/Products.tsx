import { Check, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/config/site";

interface Product {
  name: string;
  description: string;
  features: string[];
  image: string;
}

const products: Product[] = [
  {
    name: "Domestic RO Purifier",
    description:
      "Compact and efficient RO purifier designed for homes, delivering safe and great-tasting drinking water for your family.",
    features: [
      "6-stage RO purification",
      "10-litre storage tank",
      "Auto shut-off feature",
      "Wall-mountable design",
    ],
    image:
      "https://images.pexels.com/photos/11066339/pexels-photo-11066339.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    name: "RO + UV + UF Purifier",
    description:
      "Triple-action purification system combining RO, UV, and UF technologies for the highest level of water safety.",
    features: [
      "RO + UV + UF filtration",
      "TDS controller included",
      "12-litre storage capacity",
      "Digital purity display",
    ],
    image:
      "https://images.pexels.com/photos/7298554/pexels-photo-7298554.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    name: "Commercial RO System",
    description:
      "High-capacity RO system for offices, restaurants, and commercial establishments requiring large volumes of pure water.",
    features: [
      "50-100 LPH capacity",
      "Stainless steel body",
      "Multi-stage filtration",
      "Heavy-duty booster pump",
    ],
    image:
      "https://images.pexels.com/photos/36847822/pexels-photo-36847822.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-600 text-sm font-semibold tracking-wide mb-4">
            OUR PRODUCTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Premium Water Purifiers
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Choose from our range of advanced RO water purifiers designed for
            every need — from homes to commercial spaces.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-200 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-cyan-700">
                  Model {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-50 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-cyan-600" />
                      </span>
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Enquire Button */}
                <a
                  href={whatsappLink(
                    `Hi AquaPure RO, I'm interested in the ${product.name}. Please share more details and pricing.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/20 transition-all duration-200 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enquire Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
