export const africanCountries = ["Uganda", "Kenya", "Nigeria"];

export const schengenCountries = [
  "France",
  "Germany",
  "Netherlands",
  "Spain",
  "Italy",
  "Portugal",
  "Belgium",
];

export const ugandaTouristCountries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "India",
];

export const travelPurposes = ["Tourism", "Business", "Student", "Transit"];

// ─────────────────────────────────────────
// Visa Information by Route
// ─────────────────────────────────────────

export interface VisaInfo {
  visaType: string;
  processingTime: string;
  approvalRate: string;
  serviceFee: string;
  notes: string;
}

export const visaRoutes: Record<string, VisaInfo> = {
  "schengen": {
    visaType: "Schengen short-stay (Type C)",
    processingTime: "10–15 business days",
    approvalRate: "98%",
    serviceFee: "$79",
    notes: "Apply at the embassy of the country you'll stay longest in.",
  },
  "uganda_tourist": {
    visaType: "Uganda Tourist Visa (Single Entry)",
    processingTime: "2–5 business days",
    approvalRate: "99%",
    serviceFee: "$59",
    notes: "Valid for 90 days. E-visa option available for faster processing.",
  },
};

export const pricingPlans = [
  {
    key: "basic",
    name: "Basic",
    price: "$49",
    description: "Document checklist + form review",
  },
  {
    key: "pro",
    name: "Pro",
    price: "$99",
    description: "Full assistance + interview prep + resubmission support",
  },
  {
    key: "express",
    name: "Express",
    price: "$149",
    description: "Everything in Pro + priority processing + 48-hr turnaround",
  },
];
