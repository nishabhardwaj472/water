import { useState, FormEvent } from "react";
import {
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
} from "lucide-react";
import { WHATSAPP_BASE_URL, COMPANY } from "@/config/site";

interface FormData {
  name: string;
  mobile: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Please enter your mobile number";
    } else if (!/^[0-9+\-\s]{10,15}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Please enter a valid mobile number";
    }
    if (!formData.message.trim()) newErrors.message = "Please enter a message";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setFormData({ name: "", mobile: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormData]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-50 to-transparent rounded-full blur-3xl opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-600 text-sm font-semibold tracking-wide mb-4">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Have a question or need a service? Send us a message and we'll get
            back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl shadow-cyan-500/20">
              <h3 className="text-2xl font-bold mb-2">Let's Talk Water</h3>
              <p className="text-cyan-100 mb-8">
                Reach out to us through any of these channels. We're here to
                help with all your RO water purifier needs.
              </p>

              <div className="space-y-5">
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/25 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-cyan-200 font-medium">Call Us</p>
                    <p className="text-base font-semibold">{COMPANY.phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/25 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-cyan-200 font-medium">Email</p>
                    <p className="text-base font-semibold">{COMPANY.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-cyan-200 font-medium">Address</p>
                    <p className="text-base font-semibold">{COMPANY.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-cyan-200 font-medium">Hours</p>
                    <p className="text-base font-semibold">
                      Mon–Sat: 9 AM – 7 PM
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl text-base font-semibold text-cyan-700 bg-white hover:bg-cyan-50 transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30" />
                  <div className="relative w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Message Sent!
                </h3>
                <p className="text-slate-500">
                  Thank you for reaching out. We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 rounded-xl border text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? "border-red-300 focus:ring-red-200"
                        : "border-slate-200 focus:border-cyan-400 focus:ring-cyan-200"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Mobile
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className={`w-full px-4 py-3 rounded-xl border text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.mobile
                        ? "border-red-300 focus:ring-red-200"
                        : "border-slate-200 focus:border-cyan-400 focus:ring-cyan-200"
                    }`}
                  />
                  {errors.mobile && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.mobile}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="How can we help you?"
                    className={`w-full px-4 py-3 rounded-xl border text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.message
                        ? "border-red-300 focus:ring-red-200"
                        : "border-slate-200 focus:border-cyan-400 focus:ring-cyan-200"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/30 transition-all duration-200 hover:scale-[1.02]"
                >
                  <Send className="w-5 h-5" />
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
