"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Briefcase,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Languages,
  Menu,
  Plane,
  Route,
  ShieldCheck,
  Smartphone,
  UserCheck,
  Wallet,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const africanCountries = ["Algeria","Angola","Benin","Botswana","Burkina Faso","Burundi","Cabo Verde","Cameroon","Central African Republic","Chad","Comoros","Congo (Republic)","Congo (DRC)","Côte d'Ivoire","Djibouti","Egypt","Equatorial Guinea","Eritrea","Eswatini","Ethiopia","Gabon","Gambia","Ghana","Guinea","Guinea-Bissau","Kenya","Lesotho","Liberia","Libya","Madagascar","Malawi","Mali","Mauritania","Mauritius","Morocco","Mozambique","Namibia","Niger","Nigeria","Rwanda","São Tomé and Príncipe","Senegal","Seychelles","Sierra Leone","Somalia","South Africa","South Sudan","Sudan","Tanzania","Togo","Tunisia","Uganda","Zambia","Zimbabwe"];

const schengenCountries = ["Austria","Belgium","Bulgaria","Croatia","Czech Republic","Denmark","Estonia","Finland","France","Germany","Greece","Hungary","Iceland","Italy","Latvia","Liechtenstein","Lithuania","Luxembourg","Malta","Netherlands","Norway","Poland","Portugal","Romania","Slovakia","Slovenia","Spain","Sweden","Switzerland"];

const testimonials = [
  { name: "Aisha N.", meta: "Uganda · Tourism", flag: "🇺🇬", quote: "I finally got my tourist visa approved after two failed attempts. Their guidance was practical and clear." },
  { name: "Chinedu O.", meta: "Nigeria · Business", flag: "🇳🇬", quote: "As a founder traveling for meetings, I needed speed and confidence. Ailes Global handled everything professionally." },
  { name: "Wanjiku M.", meta: "Kenya · Student", flag: "🇰🇪", quote: "They prepared every document and interview point I needed. The process felt human and organized." },
  { name: "Kwame A.", meta: "Ghana · Traveler", flag: "🇬🇭", quote: "WhatsApp support was fast and personal. I always knew the next step and what to submit." },
];

type FormState = {
  citizenship: string;
  destination: string;
  purpose: string;
  travelDates: string;
  fullName: string;
  email: string;
  phone: string;
  passportNumber: string;
  dateOfBirth: string;
};

const initialForm: FormState = {
  citizenship: "",
  destination: "",
  purpose: "",
  travelDates: "",
  fullName: "",
  email: "",
  phone: "",
  passportNumber: "",
  dateOfBirth: "",
};

const pricingPlans = [
  { key: "basic", title: "BASIC", price: "$49", description: "Document checklist + form review", classes: "bg-[#0D1B2A] text-white" },
  { key: "pro", title: "PRO", price: "$99", description: "Full assistance + interview prep + resubmission guarantee", classes: "bg-[#F9A825] text-[#0D1B2A]" },
  { key: "express", title: "EXPRESS", price: "$149", description: "Everything in Pro + priority processing + 48hr turnaround", classes: "bg-[#1B5E20] text-white" },
];

export function AfricaVisaPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [showVisaResult, setShowVisaResult] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState<FormState>(initialForm);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formError, setFormError] = useState("");
  const [successReference, setSuccessReference] = useState<string | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleTestimonials, setVisibleTestimonials] = useState(1);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 8);
    const onResize = () => {
      if (window.innerWidth >= 1024) return setVisibleTestimonials(4);
      if (window.innerWidth >= 768) return setVisibleTestimonials(2);
      return setVisibleTestimonials(1);
    };

    onResize();
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const testimonialMax = useMemo(() => Math.max(0, testimonials.length - visibleTestimonials), [visibleTestimonials]);

  useEffect(() => {
    if (testimonialIndex > testimonialMax) setTestimonialIndex(testimonialMax);
  }, [testimonialIndex, testimonialMax]);

  const validateStep = (step: number) => {
    if (step === 1 && (!formState.citizenship || !formState.destination || !formState.purpose || !formState.travelDates)) {
      setFormError("Please complete all travel information fields.");
      return false;
    }
    if (step === 2 && (!formState.fullName || !formState.email || !formState.phone || !formState.passportNumber || !formState.dateOfBirth)) {
      setFormError("Please complete all personal information fields.");
      return false;
    }
    if (step === 3 && !selectedPlan) {
      setFormError("Please select a plan.");
      return false;
    }
    if (step === 3 && !acceptedTerms) {
      setFormError("Please accept the terms to continue.");
      return false;
    }
    setFormError("");
    return true;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((s) => Math.min(3, s + 1));
  };

  const prevStep = () => {
    setFormError("");
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const submitApplication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    const ref = `${Math.floor(100000 + Math.random() * 900000)}`;
    setSuccessReference(ref);
    setFormState(initialForm);
    setSelectedPlan("");
    setAcceptedTerms(false);
    setCurrentStep(1);
  };

  return (
    <div className="bg-white text-[#0D1B2A]">
      <nav className={`fixed inset-x-0 top-0 z-50 transition ${isSticky ? "border-b border-[#0D1B2A]/10 bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B5E20] text-white"><ShieldCheck className="h-5 w-5" /></span>
            <span><span className="block text-sm font-extrabold">Ailes Global</span><span className="block text-xs text-slate-500">Travel Without Barriers</span></span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-700 md:flex">
            <a href="#how-it-works" className="hover:text-[#1B5E20]">How It Works</a>
            <a href="#visa-types" className="hover:text-[#1B5E20]">Visa Types</a>
            <a href="#pricing" className="hover:text-[#1B5E20]">Pricing</a>
            <a href="#testimonials" className="hover:text-[#1B5E20]">Testimonials</a>
          </div>

          <div className="hidden md:block"><a href="#apply" className="inline-flex h-11 items-center justify-center rounded-xl bg-[#F9A825] px-5 text-sm font-bold text-[#0D1B2A]">Apply Now</a></div>
          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">{menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
              <div className="flex flex-col gap-3 text-sm font-semibold">
                <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
                <a href="#visa-types" onClick={() => setMenuOpen(false)}>Visa Types</a>
                <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
                <a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="#apply" onClick={() => setMenuOpen(false)} className="mt-1 inline-flex h-10 items-center justify-center rounded-lg bg-[#F9A825] font-bold">Apply Now</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <header id="home" className="relative overflow-hidden pt-28 text-white sm:pt-32" style={{ background: "linear-gradient(120deg, rgba(13,27,42,0.92), rgba(27,94,32,0.88)), url('https://images.unsplash.com/photo-1544735716-392fe2489e15?auto=format&fit=crop&w=1700&q=80') center/cover no-repeat" }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold"><BadgeCheck className="h-4 w-4 text-[#F9A825]" /> Built for African travelers by Africans</p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">Your European Visa, Handled by Africans Who Understand You</h1>
            <p className="mt-5 max-w-xl text-base text-slate-100 sm:text-lg">Fast, affordable Schengen visa assistance built for African passport holders.</p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-[#0D1B2A] shadow-2xl">
            <h2 className="text-xl font-bold sm:text-2xl">Check visa requirements</h2>
            <p className="mt-1 text-sm text-slate-600">iVisa-style quick check for Schengen routes.</p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-semibold">I am from...</label>
                <select value={fromCountry} onChange={(e) => setFromCountry(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3">
                  <option value="">Select African country</option>
                  {africanCountries.map((country) => <option key={country} value={country}>{country}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold">I want to visit...</label>
                <select value={toCountry} onChange={(e) => setToCountry(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3">
                  <option value="">Select Schengen country</option>
                  {schengenCountries.map((country) => <option key={country} value={country}>{country}</option>)}
                </select>
              </div>
              <button onClick={() => setShowVisaResult(Boolean(fromCountry && toCountry))} className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#F9A825] text-sm font-bold text-[#0D1B2A]">Check My Visa →</button>
            </div>

            <AnimatePresence>
              {showVisaResult && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="mt-4 rounded-2xl border border-[#1B5E20]/30 bg-[#1B5E20]/10 p-4">
                  <p className="text-sm font-semibold text-[#0D1B2A]">You need a Schengen Visa. Processing time: 15 days. Our service fee starts at $79.</p>
                  <a href="#apply" className="mt-3 inline-flex h-10 items-center justify-center rounded-lg bg-[#1B5E20] px-4 text-sm font-bold text-white">Start Application</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <section className="bg-[#0D1B2A] py-5 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 text-center sm:px-6 md:grid-cols-4 lg:px-8">
          {["10,000+ Visas Processed","98% Approval Rate","54 African Countries Served","24/7 WhatsApp Support"].map((item) => <div key={item} className="rounded-xl bg-white/8 px-3 py-3 text-sm font-semibold text-[#F9A825]">{item}</div>)}
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center"><h2 className="text-3xl font-extrabold text-[#0D1B2A] sm:text-4xl">How It Works</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[{ icon: Smartphone, title: "Step 1", text: "Fill our simple online form (5 minutes)" },{ icon: Wallet, title: "Step 2", text: "Pay securely via Mobile Money, card or bank transfer" },{ icon: UserCheck, title: "Step 3", text: "Our experts prepare and review your documents" },{ icon: Plane, title: "Step 4", text: "Attend your consulate appointment & receive your visa" }].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl bg-white p-6 shadow-sm"><Icon className="h-8 w-8 text-[#1B5E20]" /><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mt-2 text-sm text-slate-600">{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section id="visa-types" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Visa Types</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[{ icon: Plane, title: "Tourist Visa", desc: "For leisure trips and family visits." },{ icon: Briefcase, title: "Business Visa", desc: "For meetings, trade, and conferences." },{ icon: GraduationCap, title: "Student Visa", desc: "For admission and academic travel." },{ icon: Route, title: "Transit Visa", desc: "For stopovers and route connections." }].map(({ icon: Icon, title, desc }) => (
              <article key={title} className="rounded-2xl border border-slate-200 p-5"><Icon className="h-7 w-7 text-[#1B5E20]" /><h3 className="mt-3 text-lg font-bold">{title}</h3><p className="mt-2 text-sm text-slate-600">{desc}</p><button className="mt-4 text-sm font-semibold text-[#1B5E20]">Learn More</button></article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Why Choose Us</h2>
            <div className="mt-6 space-y-4 text-sm sm:text-base">
              {[{ icon: Languages, text: "We speak your language — multilingual support" },{ icon: BadgeCheck, text: "We know African passport challenges — stronger applications" },{ icon: Wallet, text: "Pay with Mobile Money — MTN MoMo, Airtel, M-Pesa, Flutterwave" },{ icon: Smartphone, text: "WhatsApp-first support — talk to a real human" },{ icon: Building2, text: "African-country consulate guides — tailored embassy requirements" }].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3"><Icon className="mt-0.5 h-5 w-5 text-[#F9A825]" /><p>{text}</p></div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-lg"><img src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1400&q=80" alt="African city skyline" className="h-full min-h-[320px] w-full object-cover" /></div>
        </div>
      </section>

      <section id="pricing" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center"><h2 className="text-3xl font-extrabold sm:text-4xl">Pricing</h2><p className="mt-2 text-sm text-slate-600">Government/consulate fees NOT included.</p></div>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article key={plan.key} className={`rounded-3xl p-6 shadow-sm ${plan.classes}`}>
                <div className="flex items-center justify-between"><h3 className="text-lg font-extrabold">{plan.title}</h3>{plan.key === "pro" && <span className="rounded-full bg-[#0D1B2A] px-3 py-1 text-xs font-semibold text-white">Best Value</span>}</div>
                <p className="mt-3 text-4xl font-extrabold">{plan.price}</p>
                <p className="mt-3 text-sm">{plan.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Testimonials</h2>
            <div className="flex gap-2">
              <button onClick={() => setTestimonialIndex((i) => Math.max(0, i - 1))} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white" aria-label="Previous"><ChevronLeft className="h-5 w-5" /></button>
              <button onClick={() => setTestimonialIndex((i) => Math.min(testimonialMax, i + 1))} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white" aria-label="Next"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
          <div className="mt-8 overflow-hidden">
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${testimonialIndex * (100 / visibleTestimonials)}%)` }}>
              {testimonials.map((item) => (
                <article key={item.name} className="p-2" style={{ flex: `0 0 ${100 / visibleTestimonials}%` }}>
                  <div className="h-full rounded-2xl bg-white p-5 shadow-sm">
                    <p className="text-[#F9A825]">★★★★★</p>
                    <p className="mt-3 text-sm text-slate-700">“{item.quote}”</p>
                    <p className="mt-4 font-bold">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.flag} {item.meta}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold sm:text-4xl">Application Form</h2>
          <div className="mt-8 rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full bg-[#1B5E20] transition-all" style={{ width: `${(currentStep / 3) * 100}%` }} /></div>
            <p className="mt-2 text-xs text-slate-500">Step {currentStep} of 3</p>

            <form onSubmit={submitApplication} className="mt-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <select value={formState.citizenship} onChange={(e) => setFormState((s) => ({ ...s, citizenship: e.target.value }))} className="rounded-xl border border-slate-300 px-4 py-3"><option value="">Citizenship (54 African countries)</option>{africanCountries.map((country) => <option key={country} value={country}>{country}</option>)}</select>
                    <select value={formState.destination} onChange={(e) => setFormState((s) => ({ ...s, destination: e.target.value }))} className="rounded-xl border border-slate-300 px-4 py-3"><option value="">Destination country</option>{schengenCountries.map((country) => <option key={country} value={country}>{country}</option>)}</select>
                    <select value={formState.purpose} onChange={(e) => setFormState((s) => ({ ...s, purpose: e.target.value }))} className="rounded-xl border border-slate-300 px-4 py-3"><option value="">Travel purpose</option><option value="Tourism">Tourism</option><option value="Business">Business</option><option value="Student">Student</option><option value="Transit">Transit</option></select>
                    <input value={formState.travelDates} onChange={(e) => setFormState((s) => ({ ...s, travelDates: e.target.value }))} placeholder="Travel dates" className="rounded-xl border border-slate-300 px-4 py-3" />
                  </div>
                  <div className="flex justify-end"><button type="button" onClick={nextStep} className="inline-flex h-11 items-center rounded-xl bg-[#1B5E20] px-5 text-sm font-bold text-white">Next</button></div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input value={formState.fullName} onChange={(e) => setFormState((s) => ({ ...s, fullName: e.target.value }))} placeholder="Full name" className="rounded-xl border border-slate-300 px-4 py-3" />
                    <input type="email" value={formState.email} onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))} placeholder="Email" className="rounded-xl border border-slate-300 px-4 py-3" />
                    <input value={formState.phone} onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))} placeholder="Phone with country code" className="rounded-xl border border-slate-300 px-4 py-3" />
                    <input value={formState.passportNumber} onChange={(e) => setFormState((s) => ({ ...s, passportNumber: e.target.value }))} placeholder="Passport number" className="rounded-xl border border-slate-300 px-4 py-3" />
                    <input type="date" value={formState.dateOfBirth} onChange={(e) => setFormState((s) => ({ ...s, dateOfBirth: e.target.value }))} className="rounded-xl border border-slate-300 px-4 py-3 sm:col-span-2" />
                  </div>
                  <div className="flex justify-between"><button type="button" onClick={prevStep} className="inline-flex h-11 items-center rounded-xl border border-slate-300 px-5 text-sm font-bold">Back</button><button type="button" onClick={nextStep} className="inline-flex h-11 items-center rounded-xl bg-[#1B5E20] px-5 text-sm font-bold text-white">Next</button></div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {pricingPlans.map((plan) => (
                      <button key={plan.key} type="button" onClick={() => setSelectedPlan(plan.title)} className={`rounded-2xl p-4 text-left ${plan.classes} ${selectedPlan === plan.title ? "ring-4 ring-[#F9A825]/40" : ""}`}>
                        <p className="font-extrabold">{plan.title}</p><p className="mt-2 text-2xl font-extrabold">{plan.price}</p><p className="mt-2 text-xs">{plan.description}</p>
                      </button>
                    ))}
                  </div>
                  <label className="mt-4 flex items-start gap-2 text-sm"><input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="mt-1" /><span>I agree to the terms and understand government/consulate fees are not included.</span></label>
                  <div className="mt-5 flex justify-between"><button type="button" onClick={prevStep} className="inline-flex h-11 items-center rounded-xl border border-slate-300 px-5 text-sm font-bold">Back</button><button type="submit" className="inline-flex h-11 items-center rounded-xl bg-[#F9A825] px-5 text-sm font-bold text-[#0D1B2A]">Proceed to Payment</button></div>
                </div>
              )}
            </form>

            {formError && <p className="mt-4 text-sm font-semibold text-red-600">{formError}</p>}

            <AnimatePresence>
              {successReference && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="mt-4 rounded-xl border border-[#1B5E20]/30 bg-[#1B5E20]/10 p-4 text-sm font-semibold">
                  Application received! Our team will contact you on WhatsApp within 2 hours. Reference:<span className="ml-1 font-extrabold">#{successReference}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold sm:text-4xl">FAQ</h2>
          <div className="mt-8 space-y-3">
            {[{ q: "Do you guarantee visa approval?", a: "No. Visa decisions are made solely by the relevant consular authority." },{ q: "How is this different from applying myself?", a: "We provide structured guidance and preparation tailored to African traveler realities." },{ q: "Which payment methods do you accept?", a: "Mobile Money, cards, bank transfer, and Flutterwave-supported options." },{ q: "How long does the Schengen visa process take?", a: "Typical processing is around 15 days after submission." },{ q: "What if my visa is rejected?", a: "Our Pro and Express plans include deeper support for stronger resubmission." },{ q: "Do you help with consulate appointments?", a: "Yes. We guide appointment preparation and required document flow." }].map((item, index) => (
              <article key={item.q} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <button onClick={() => setOpenFaq((v) => (v === index ? null : index))} className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-bold sm:text-base">{item.q}<ChevronDown className={`h-5 w-5 transition ${openFaq === index ? "rotate-180" : ""}`} /></button>
                <AnimatePresence initial={false}>{openFaq === index && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4"><p className="pb-4 text-sm text-slate-600">{item.a}</p></motion.div>)}</AnimatePresence>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#0D1B2A] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div><p className="text-lg font-extrabold">Ailes Global</p><p className="mt-1 text-sm text-slate-300">Travel Without Barriers</p></div>
            <div className="text-sm text-slate-300"><p className="font-semibold text-white">Links</p><div className="mt-2 space-y-1"><a className="block" href="#home">About</a><a className="block" href="#how-it-works">How It Works</a><a className="block" href="#pricing">Pricing</a><a className="block" href="#faq">FAQ</a><a className="block" href="#apply">Contact</a></div></div>
            <div className="text-sm text-slate-300"><p className="font-semibold text-white">Contact</p><p className="mt-2">WhatsApp: +000 000 000 000</p><p>Email: hello@ailesglobal.com</p></div>
            <div className="text-sm text-slate-300"><p className="font-semibold text-white">Social</p><p className="mt-2">Instagram · Facebook · X · LinkedIn</p></div>
          </div>
          <p className="mt-8 border-t border-white/10 pt-5 text-xs text-slate-400">Ailes Global is a private visa assistance service. We are not affiliated with any government or embassy. Visa decisions are made solely by the relevant consular authority. You may apply directly at your nearest embassy for free.</p>
        </div>
      </footer>

      <Link href="https://wa.me/000000000000" className="fixed bottom-5 right-5 z-40 inline-flex h-12 items-center rounded-full bg-[#25D366] px-5 text-sm font-bold text-white shadow-lg">WhatsApp</Link>
    </div>
  );
}
