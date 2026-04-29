"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Globe, Plane, Flag, ArrowRight, CheckCircle } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function LandingHero() {
  const [destination, setDestination] = useState("");
  const [purpose, setPurpose] = useState("");
  const [nationality, setNationality] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !purpose || !nationality) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log("🚀 Application started:", { destination, purpose, nationality });
    router.push("/apply");
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-14 lg:py-16">
      {/* === BACKGROUND PATTERN LAYERS === */}
      {/* 1. Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50" />

      {/* 2. Subtle global dot pattern (feels like a world map / network) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.12) 0.8px, transparent 0),
            radial-gradient(circle at 75% 35%, rgba(16, 185, 129, 0.1) 0.8px, transparent 0),
            radial-gradient(circle at 40% 70%, rgba(16, 185, 129, 0.08) 0.8px, transparent 0),
            radial-gradient(circle at 85% 85%, rgba(16, 185, 129, 0.1) 0.8px, transparent 0)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.75,
        }}
      />

      {/* 3. Very faint connecting lines (modern "global connections" feel) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 49%, rgba(16, 185, 129, 0.15) 50%, transparent 51%),
            linear-gradient(0deg, transparent 49%, rgba(16, 185, 129, 0.15) 50%, transparent 51%)
          `,
          backgroundSize: "120px 120px",
        }}
      />

      {/* 4. Soft radial spotlight for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#10b98115_0%,transparent_60%)] pointer-events-none" />

      {/* Content container */}
      <div className="max-w-7xl w-full grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-16 items-center relative z-10">
        {/* LEFT COLUMN - STORY + TRUST */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
        >
          {/* ... (same left content as previous version - unchanged) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100 px-4 h-9 rounded-3xl text-sm font-medium text-emerald-700 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            98% first-time approval rate
          </motion.div>

          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tighter"
          >
            Global Visas.
            <br />
            Done Right.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 text-base sm:text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0"
          >
            Professional visa &amp; study abroad support. Zero stress. Real results.
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left mx-auto lg:mx-0 max-w-xl sm:max-w-none"
          >
            <motion.div variants={itemVariants} className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">End-to-end guidance</p>
                <p className="text-sm text-gray-500">From documents to approval</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Consulate-ready packets</p>
                <p className="text-sm text-gray-500">We package everything</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Local payment + support</p>
                <p className="text-sm text-gray-500">Africa-first experience</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold text-gray-900">1,247</span>
              <span className="text-gray-500">applicants helped</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold text-gray-900">15</span>
              <span className="text-gray-500">countries covered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold text-emerald-600">4.98</span>
              <span className="text-gray-500">average rating</span>
            </div>
          </motion.div>

          <Link href="/apply" className="hidden lg:inline-block mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-black text-white rounded-3xl text-lg font-semibold flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all"
            >
              Start Your Application
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* RIGHT COLUMN - FORM (unchanged from last version) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 w-full max-w-xl mx-auto lg:mx-0"
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/10 border border-white/60 p-6 sm:p-8 md:p-10">
            {/* ... rest of the form exactly as before ... */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.h2
                variants={itemVariants}
                className="text-3xl font-semibold text-gray-900 mb-2"
              >
                Get matched in 60 seconds
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-gray-500 mb-8"
              >
                Tell us a bit about your journey — we’ll show you the fastest path forward.
              </motion.p>

              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Destination, Purpose, Nationality fields (identical to previous) */}
                <motion.div variants={itemVariants} className="relative">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Where are you going?
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                      className="w-full h-14 pl-12 pr-5 bg-white border border-gray-200 rounded-2xl text-base focus:border-black focus:ring-0 transition-all"
                    >
                      <option value="">Select destination</option>
                      <option value="United Kingdom">🇬🇧 United Kingdom</option>
                      <option value="Canada">🇨🇦 Canada</option>
                      <option value="Germany">🇩🇪 Germany</option>
                      <option value="France">🇫🇷 France</option>
                      <option value="Netherlands">🇳🇱 Netherlands</option>
                      <option value="Ireland">🇮🇪 Ireland</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Purpose of travel
                  </label>
                  <div className="relative">
                    <Plane className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      required
                      className="w-full h-14 pl-12 pr-5 bg-white border border-gray-200 rounded-2xl text-base focus:border-black focus:ring-0 transition-all"
                    >
                      <option value="">Select purpose</option>
                      <option value="Study">📚 Study</option>
                      <option value="Work">💼 Work</option>
                      <option value="Tourism">✈️ Tourism</option>
                      <option value="Business">🤝 Business</option>
                      <option value="Family Visit">👨‍👩‍👧 Family Visit</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Your nationality
                  </label>
                  <div className="relative">
                    <Flag className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      required
                      className="w-full h-14 pl-12 pr-5 bg-white border border-gray-200 rounded-2xl text-base focus:border-black focus:ring-0 transition-all"
                    >
                      <option value="">Select nationality</option>
                      <option value="Uganda">🇺🇬 Uganda</option>
                      <option value="Kenya">🇰🇪 Kenya</option>
                      <option value="Nigeria">🇳🇬 Nigeria</option>
                      <option value="Ghana">🇬🇭 Ghana</option>
                      <option value="Rwanda">🇷🇼 Rwanda</option>
                      <option value="Tanzania">🇹🇿 Tanzania</option>
                    </select>
                  </div>
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 mt-2 bg-black text-white rounded-3xl text-lg font-semibold flex items-center justify-center gap-3 disabled:opacity-70 transition-all hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Matching you…
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </form>

              <motion.p
                variants={itemVariants}
                className="text-center text-xs text-gray-400 mt-8"
              >
                Takes 47 seconds • No credit card • Confidential
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="lg:hidden mt-10 relative z-10"
      >
        <Link href="/apply">
          <button className="w-full max-w-xs mx-auto px-8 py-4 bg-black text-white rounded-3xl text-lg font-semibold flex items-center justify-center gap-3 shadow-xl">
            Start Your Application
            <ArrowRight className="h-5 w-5" />
          </button>
        </Link>
      </motion.div>
    </section>
  );
}