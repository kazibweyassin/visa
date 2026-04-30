"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Globe2,
  MapPin,
  Plane,
  User,
  CreditCard,
  ShieldCheck,
  Sparkles,
  ChevronDown,
} from "lucide-react";

import {
  africanCountries,
  pricingPlans,
  schengenCountries,
  travelPurposes,
} from "@/lib/visa-data";

/* ── Types ── */
type FormState = {
  citizenship: string;
  destination: string;
  purpose: string;
  travelStart: string;
  travelEnd: string;
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
  travelStart: "",
  travelEnd: "",
  fullName: "",
  email: "",
  phone: "",
  passportNumber: "",
  dateOfBirth: "",
};

const STEPS = [
  { number: 1, label: "Travel details", icon: Plane },
  { number: 2, label: "Personal info", icon: User },
  { number: 3, label: "Choose a plan", icon: CreditCard },
];

/* ── Shared field wrapper ── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ── Styled select ── */
function StyledSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 hover:border-stone-300 pr-9"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
    </div>
  );
}

/* ── Styled input ── */
function StyledInput({
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 shadow-sm outline-none transition placeholder:text-stone-300 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 hover:border-stone-300"
    />
  );
}

/* ── Plan card ── */
function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: { key: string; name: string; price: string; description: string };
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
        selected
          ? "border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100"
          : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm"
      }`}
    >
      {selected && (
        <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
          <CheckCircle2 className="h-3.5 w-3.5 text-white" strokeWidth={3} />
        </span>
      )}
      <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${selected ? "text-emerald-600" : "text-stone-400"}`}>
        {plan.name}
      </p>
      <p className={`mt-2 text-2xl font-black tracking-tight ${selected ? "text-emerald-900" : "text-stone-900"}`}
        style={{ fontFamily: "'Georgia', serif" }}>
        {plan.price}
      </p>
      <p className={`mt-2 text-xs leading-relaxed ${selected ? "text-emerald-700" : "text-stone-500"}`}>
        {plan.description}
      </p>
    </motion.button>
  );
}

/* ── Main component ── */
export function ApplyForm() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState<FormState>(initialForm);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReference, setSuccessReference] = useState<string | null>(null);

  const set = (key: keyof FormState) => (value: string) =>
    setFormState((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    const from = searchParams.get("from") ?? "";
    const to = searchParams.get("to") ?? "";
    const plan = searchParams.get("plan") ?? "";
    const purpose = searchParams.get("purpose") ?? "";
    const start = searchParams.get("start") ?? "";
    const end = searchParams.get("end") ?? "";

    setFormState((prev) => {
      const nextState = {
        ...prev,
        citizenship: from || prev.citizenship,
        destination: to || prev.destination,
        purpose: purpose || prev.purpose,
        travelStart: start || prev.travelStart,
        travelEnd: end || prev.travelEnd,
      };

      if (
        prev.citizenship === nextState.citizenship &&
        prev.destination === nextState.destination &&
        prev.purpose === nextState.purpose &&
        prev.travelStart === nextState.travelStart &&
        prev.travelEnd === nextState.travelEnd
      ) {
        return prev;
      }

      return nextState;
    });

    setSelectedPlan((prev) => (plan && plan !== prev ? plan : prev));
  }, [searchParams.toString()]);

  const validateStep = (step: number) => {
    if (step === 1 && (!formState.citizenship || !formState.destination || !formState.purpose || !formState.travelStart || !formState.travelEnd)) {
      setFormError("Please complete all travel information fields.");
      return false;
    }
    if (step === 2 && (!formState.fullName || !formState.email || !formState.phone || !formState.passportNumber || !formState.dateOfBirth)) {
      setFormError("Please complete all personal information fields.");
      return false;
    }
    if (step === 3) {
      if (!selectedPlan) { setFormError("Please select a plan."); return false; }
      if (!acceptedTerms) { setFormError("Please accept the terms to continue."); return false; }
    }
    setFormError("");
    return true;
  };

  const nextStep = () => { if (validateStep(currentStep)) setCurrentStep((s) => Math.min(3, s + 1)); };
  const prevStep = () => { setFormError(""); setCurrentStep((s) => Math.max(1, s - 1)); };

  const submitApplication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSuccessReference(`${Math.floor(100000 + Math.random() * 900000)}`);
    setFormState(initialForm);
    setSelectedPlan("");
    setAcceptedTerms(false);
    setCurrentStep(1);
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-[#faf9f7] px-4 py-12 sm:px-6 lg:px-8">
      {/* Dot grid */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{ backgroundImage: `radial-gradient(circle, #d6d3ce 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />

      <div className="relative mx-auto max-w-5xl">
        {/* Top nav */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
              <Globe2 className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-stone-900 tracking-tight">AILES Global</span>
          </div>
        </div>

        {/* Main card — split layout */}
        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-900/5">
          <div className="grid lg:grid-cols-[280px_1fr]">

            {/* ── LEFT SIDEBAR ── */}
            <div className="border-b border-stone-100 bg-stone-50 p-8 lg:border-b-0 lg:border-r">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Application</p>
              <h1 className="mt-2 text-xl font-bold text-stone-900 leading-snug"
                style={{ fontFamily: "'Georgia', serif" }}>
                Start your visa journey
              </h1>
              <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                Complete once. We build the consulate-ready packet and keep you updated every step.
              </p>

              {/* Step list */}
              <nav className="mt-8 space-y-2">
                {STEPS.map((step) => {
                  const Icon = step.icon;
                  const done = currentStep > step.number;
                  const active = currentStep === step.number;
                  return (
                    <div
                      key={step.number}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                        active ? "bg-white border border-stone-200 shadow-sm" : ""
                      }`}
                    >
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                        done
                          ? "bg-emerald-500 text-white"
                          : active
                          ? "bg-stone-900 text-white"
                          : "bg-stone-200 text-stone-400"
                      }`}>
                        {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-3.5 w-3.5" />}
                      </div>
                      <div>
                        <p className={`text-xs font-semibold ${active ? "text-stone-900" : done ? "text-emerald-600" : "text-stone-400"}`}>
                          {step.label}
                        </p>
                        <p className="text-[10px] text-stone-400">Step {step.number} of 3</p>
                      </div>
                    </div>
                  );
                })}
              </nav>

              {/* Summary preview */}
              {(formState.citizenship || formState.destination) && (
                <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-4 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Summary</p>
                  {formState.citizenship && (
                    <div className="flex items-center gap-2 text-xs text-stone-600">
                      <MapPin className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      From: <span className="font-semibold text-stone-800">{formState.citizenship}</span>
                    </div>
                  )}
                  {formState.destination && (
                    <div className="flex items-center gap-2 text-xs text-stone-600">
                      <Plane className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      To: <span className="font-semibold text-stone-800">{formState.destination}</span>
                    </div>
                  )}
                  {formState.purpose && (
                    <div className="flex items-center gap-2 text-xs text-stone-600">
                      <Globe2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span className="font-semibold text-stone-800">{formState.purpose}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Trust */}
              <div className="mt-8 space-y-2">
                {["98% approval rate", "Consulate-ready packets", "WhatsApp updates"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-stone-400">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {successReference ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100">
                      <Sparkles className="h-7 w-7 text-emerald-500" />
                    </div>
                    <h2 className="mt-5 text-2xl font-bold text-stone-900" style={{ fontFamily: "'Georgia', serif" }}>
                      Application received!
                    </h2>
                    <p className="mt-3 text-sm text-stone-500 max-w-sm leading-relaxed">
                      We'll contact you within 2 hours on WhatsApp. Keep your reference number handy.
                    </p>
                    <div className="mt-6 rounded-2xl bg-stone-50 border border-stone-200 px-8 py-4">
                      <p className="text-[10px] uppercase tracking-widest text-stone-400">Reference</p>
                      <p className="mt-1 text-2xl font-black text-stone-900 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
                        #{successReference}
                      </p>
                    </div>
                    <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white hover:bg-stone-800 transition-colors">
                      Back to home
                    </Link>
                  </motion.div>
                ) : (
                  <form onSubmit={submitApplication} key="form">
                    {/* Step header */}
                    <motion.div
                      key={`header-${currentStep}`}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-8"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-1.5 flex gap-1.5">
                          {STEPS.map((s) => (
                            <motion.div
                              key={s.number}
                              animate={{ width: currentStep >= s.number ? 24 : 8 }}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                currentStep >= s.number ? "bg-emerald-500" : "bg-stone-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-stone-400 ml-1">Step {currentStep} / 3</span>
                      </div>
                      <h2 className="mt-3 text-2xl font-bold text-stone-900" style={{ fontFamily: "'Georgia', serif" }}>
                        {currentStep === 1 && "Where are you going?"}
                        {currentStep === 2 && "Tell us about yourself"}
                        {currentStep === 3 && "Pick the right plan"}
                      </h2>
                      <p className="mt-1.5 text-sm text-stone-400">
                        {currentStep === 1 && "We'll match you with the right visa and embassy requirements."}
                        {currentStep === 2 && "Your information stays confidential and is only used for your application."}
                        {currentStep === 3 && "All plans include document preparation and consulate submission support."}
                      </p>
                    </motion.div>

                    {/* ── STEP 1 ── */}
                    <AnimatePresence mode="wait">
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-5"
                        >
                          <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Citizenship">
                              <StyledSelect value={formState.citizenship} onChange={set("citizenship")} options={africanCountries} placeholder="Your country" />
                            </Field>
                            <Field label="Destination">
                              <StyledSelect value={formState.destination} onChange={set("destination")} options={schengenCountries} placeholder="Schengen country" />
                            </Field>
                            <Field label="Purpose of travel">
                              <StyledSelect value={formState.purpose} onChange={set("purpose")} options={travelPurposes} placeholder="Select purpose" />
                            </Field>
                            <div />
                            <Field label="Travel start date">
                              <StyledInput type="date" value={formState.travelStart} onChange={set("travelStart")} />
                            </Field>
                            <Field label="Travel end date">
                              <StyledInput type="date" value={formState.travelEnd} onChange={set("travelEnd")} />
                            </Field>
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 2 ── */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-5"
                        >
                          <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Full name">
                              <StyledInput value={formState.fullName} onChange={set("fullName")} placeholder="As on passport" />
                            </Field>
                            <Field label="Email address">
                              <StyledInput type="email" value={formState.email} onChange={set("email")} placeholder="you@example.com" />
                            </Field>
                            <Field label="Phone number">
                              <StyledInput value={formState.phone} onChange={set("phone")} placeholder="+256 700 000 000" />
                            </Field>
                            <Field label="Passport number">
                              <StyledInput value={formState.passportNumber} onChange={set("passportNumber")} placeholder="A12345678" />
                            </Field>
                            <Field label="Date of birth">
                              <StyledInput type="date" value={formState.dateOfBirth} onChange={set("dateOfBirth")} />
                            </Field>
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 3 ── */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-5"
                        >
                          <div className="grid gap-4 sm:grid-cols-3">
                            {pricingPlans.map((plan) => (
                              <PlanCard
                                key={plan.key}
                                plan={plan}
                                selected={selectedPlan === plan.key}
                                onSelect={() => setSelectedPlan(plan.key)}
                              />
                            ))}
                          </div>

                          <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative mt-0.5">
                              <input
                                type="checkbox"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                className="sr-only"
                              />
                              <div className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                acceptedTerms ? "border-emerald-500 bg-emerald-500" : "border-stone-300 group-hover:border-stone-400"
                              }`}>
                                {acceptedTerms && <CheckCircle2 className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                              </div>
                            </div>
                            <span className="text-sm text-stone-500 leading-relaxed">
                              I agree to the terms and understand that government and consulate fees are not included in the service fee.
                            </span>
                          </label>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Error */}
                    <AnimatePresence>
                      {formError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-5 rounded-xl bg-rose-50 border border-rose-100 px-4 py-3 text-xs font-medium text-rose-600"
                        >
                          {formError}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Nav buttons */}
                    <div className="mt-8 flex items-center justify-between">
                      {currentStep > 1 ? (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-600 hover:border-stone-300 hover:text-stone-900 hover:bg-stone-50 transition-all"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back
                        </button>
                      ) : (
                        <div />
                      )}

                      {currentStep < 3 ? (
                        <motion.button
                          type="button"
                          onClick={nextStep}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-stone-900/15 hover:bg-stone-800 transition-colors"
                        >
                          Continue
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                          className="group flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-500/25 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                              Submitting…
                            </>
                          ) : (
                            <>
                              Submit application
                              <CheckCircle2 className="h-4 w-4" />
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-stone-400">
          Your data is encrypted and never shared. Questions? {" "}
          <a href="https://wa.me/256704833021" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
            Chat with us on WhatsApp
          </a>
        </p>
      </div>
    </main>
  );
}