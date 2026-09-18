import { useState, FormEvent } from "react";
import {
  Building2,
  User,
  Lock,
  ArrowLeft,
  Loader2,
  AlertCircle,
  LogIn,
  Droplets,
} from "lucide-react";

interface CrmLoginPageProps {
  onBack: () => void;
}

interface LoginResponse {
  status: number;
  message?: string;
  launchUrl?: string;
  rawResponse?: string;
  httpStatus?: number;
  contentType?: string;
}

export default function CrmLoginPage({ onBack }: CrmLoginPageProps) {
  const [companyCode, setCompanyCode] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!companyCode.trim() || !loginId.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/crm-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            companyCode: companyCode.trim(),
            loginId: loginId.trim(),
            password: password.trim(),
          }),
        }
      );

      const data: LoginResponse = await response.json();

      if (data.status === 1 && data.launchUrl) {
        // Navigate to the launch URL — the edge function returns a 302
        // redirect to Salesnayak LoginNow, which sets session cookies
        // directly in the user's browser and loads the CRM.
        window.location.href = data.launchUrl;
        return;
      }

      setError(data.message || "Invalid CRM credentials.");
    } catch {
      setError("Unable to connect to CRM. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-xl shadow-cyan-500/30 mb-4">
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">AquaPure RO CRM</h1>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to Salesnayak CRM
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
          {error && (
            <div className="mb-5 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Company Code */}
            <div>
              <label
                htmlFor="companyCode"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Company Code
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="companyCode"
                  value={companyCode}
                  onChange={(e) => setCompanyCode(e.target.value)}
                  placeholder="Enter company code"
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-cyan-400 focus:ring-cyan-200 transition-all disabled:opacity-60"
                />
              </div>
            </div>

            {/* Login ID */}
            <div>
              <label
                htmlFor="loginId"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Login ID
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="loginId"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="Enter login ID"
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-cyan-400 focus:ring-cyan-200 transition-all disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-cyan-400 focus:ring-cyan-200 transition-all disabled:opacity-60"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/30 transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Login to Salesnayak
                </>
              )}
            </button>
          </form>

          {/* Back Button */}
          <button
            onClick={onBack}
            disabled={loading}
            className="mt-4 flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all disabled:opacity-60"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </button>
        </div>
      </div>
    </div>
  );
}
