"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

import { africanCountries, pricingPlans, schengenCountries, travelPurposes } from "@/lib/visa-data";

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

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState<FormState>(initialForm);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReference, setSuccessReference] = useState<string | null>(null);

  const stepProgress = useMemo(() => (currentStep / 3) * 100, [currentStep]);

  useEffect(() => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const plan = searchParams.get("plan");
    const purpose = searchParams.get("purpose");
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    setFormState((prev) => ({
      ...prev,
      citizenship: from ?? prev.citizenship,
      destination: to ?? prev.destination,
      purpose: purpose ?? prev.purpose,
      travelStart: start ?? prev.travelStart,
      travelEnd: end ?? prev.travelEnd,
    }));

    if (plan) setSelectedPlan(plan);
  }, [searchParams]);

  const validateStep = (step: number) => {
    if (step === 1) {
      if (
        !formState.citizenship ||
        !formState.destination ||
        !formState.purpose ||
        !formState.travelStart ||
        !formState.travelEnd
      ) {
        setFormError("Please complete all travel information fields.");
        return false;
      }
    }
    if (step === 2) {
      if (!formState.fullName || !formState.email || !formState.phone || !formState.passportNumber || !formState.dateOfBirth) {
        setFormError("Please complete all personal information fields.");
        return false;
      }
    }
    if (step === 3) {
      if (!selectedPlan) {
        setFormError("Please select a plan.");
        return false;
      }
      if (!acceptedTerms) {
        setFormError("Please accept the terms to continue.");
        return false;
      }
    }

    setFormError("");
    return true;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((step) => Math.min(3, step + 1));
  };

  const prevStep = () => {
    setFormError("");
    setCurrentStep((step) => Math.max(1, step - 1));
  };

  const submitApplication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep(3)) return;
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const reference = `${Math.floor(100000 + Math.random() * 900000)}`;
    setSuccessReference(reference);
    setFormState(initialForm);
    setSelectedPlan("");
    setAcceptedTerms(false);
    setCurrentStep(1);
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-[#0B1324] px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#F4C15D]">Ailes Global</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Start your visa application
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Complete your details once. We will build the consulate-ready packet and keep you updated
                on every step.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              Back to home
            </Link>
          </div>

          <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-[#F4C15D] transition-all" style={{ width: `${stepProgress}%` }} />
          </div>
          <p className="mt-2 text-xs text-slate-400">Step {currentStep} of 3</p>

          <form onSubmit={submitApplication} className="mt-8 space-y-8">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Citizenship
                    </label>
                    <select
                      value={formState.citizenship}
                      onChange={(event) =>
                        setFormState((state) => ({ ...state, citizenship: event.target.value }))
                      }
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none"
                    >
                      <option value="">Select country</option>
                      {africanCountries.map((country) => (
                        <option key={country} value={country} className="text-slate-950">
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Destination
                    </label>
                    <select
                      value={formState.destination}
                      onChange={(event) =>
                        setFormState((state) => ({ ...state, destination: event.target.value }))
                      }
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none"
                    >
                      <option value="">Select Schengen country</option>
                      {schengenCountries.map((country) => (
                        <option key={country} value={country} className="text-slate-950">
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Travel purpose
                    </label>
                    <select
                      value={formState.purpose}
                      onChange={(event) =>
                        setFormState((state) => ({ ...state, purpose: event.target.value }))
                      }
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none"
                    >
                      <option value="">Select purpose</option>
                      {travelPurposes.map((purpose) => (
                        <option key={purpose} value={purpose} className="text-slate-950">
                          {purpose}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Travel start date
                    </label>
                    <input
                      type="date"
                      value={formState.travelStart}
                      onChange={(event) =>
                        setFormState((state) => ({ ...state, travelStart: event.target.value }))
                      }
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Travel end date
                    </label>
                    <input
                      type="date"
                      value={formState.travelEnd}
                      onChange={(event) =>
                        setFormState((state) => ({ ...state, travelEnd: event.target.value }))
                      }
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F4C15D] px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Full name
                    </label>
                    <input
                      value={formState.fullName}
                      onChange={(event) =>
                        setFormState((state) => ({ ...state, fullName: event.target.value }))
                      }
                      placeholder="Enter your full name"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(event) =>
                        setFormState((state) => ({ ...state, email: event.target.value }))
                      }
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Phone
                    </label>
                    <input
                      value={formState.phone}
                      onChange={(event) =>
                        setFormState((state) => ({ ...state, phone: event.target.value }))
                      }
                      placeholder="+256700000000"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Passport number
                    </label>
                    <input
                      value={formState.passportNumber}
                      onChange={(event) =>
                        setFormState((state) => ({ ...state, passportNumber: event.target.value }))
                      }
                      placeholder="Passport number"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Date of birth
                    </label>
                    <input
                      type="date"
                      value={formState.dateOfBirth}
                      onChange={(event) =>
                        setFormState((state) => ({ ...state, dateOfBirth: event.target.value }))
                      }
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F4C15D] px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  {pricingPlans.map((plan) => (
                    <button
                      key={plan.key}
                      type="button"
                      onClick={() => setSelectedPlan(plan.key)}
                      className={`rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4 text-left transition ${
                        selectedPlan === plan.key ? "ring-2 ring-[#F4C15D]/60" : ""
                      }`}
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{plan.name}</p>
                      <p className="mt-2 text-2xl font-semibold text-white">{plan.price}</p>
                      <p className="mt-2 text-xs text-slate-300">{plan.description}</p>
                    </button>
                  ))}
                </div>
                <label className="flex items-start gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                    className="mt-1"
                  />
                  <span>I agree to the terms and understand government/consulate fees are not included.</span>
                </label>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F4C15D] px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Submitting..." : "Submit application"}
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </form>

          {formError && <p className="mt-4 text-sm font-semibold text-rose-200">{formError}</p>}

          <AnimatePresence>
            {successReference && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100"
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <ShieldCheck className="h-4 w-4" />
                  Application received
                </div>
                <p className="mt-2 text-sm text-slate-200">
                  We will contact you within 2 hours on WhatsApp. Reference #{successReference}.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}