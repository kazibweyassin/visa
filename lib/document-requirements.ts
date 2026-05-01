/**
 * Document Requirements Data
 * Centralized source of truth for visa document requirements by type
 */

import { DocumentRequirement, DocumentCategory } from "@/lib/types/document";

export const schengenDocumentRequirements: DocumentRequirement[] = [
  // Passport
  {
    id: "schengen-passport",
    category: "passport",
    name: "Valid Passport",
    description: "Original passport with validity of 6+ months beyond your travel dates",
    required: true,
    examples: ["Biometric passport", "Machine-readable passport"],
    acceptedFormats: ["PDF", "JPG", "PNG"],
    notes: "Must have at least 2 blank pages",
  },
  
  // Financial
  {
    id: "schengen-bank-statement",
    category: "financial",
    name: "Bank Statements",
    description: "Last 3 months of bank statements showing sufficient funds (€100+ per day minimum)",
    required: true,
    examples: ["€3000 minimum", "Monthly salary slip"],
    acceptedFormats: ["PDF", "JPG"],
  },
  {
    id: "schengen-proof-funds",
    category: "financial",
    name: "Proof of Financial Means",
    description: "Evidence of financial support (credit cards, sponsorship letter, etc.)",
    required: true,
    examples: ["Credit card statements", "Sponsorship letter", "Employment letter"],
    acceptedFormats: ["PDF", "JPG"],
  },

  // Accommodation
  {
    id: "schengen-accommodation",
    category: "accommodation",
    name: "Accommodation Proof",
    description: "Booking confirmation, hotel reservation, or invitation letter",
    required: true,
    examples: ["Hotel booking confirmation", "Airbnb confirmation", "Invitation letter from host"],
    acceptedFormats: ["PDF", "JPG"],
  },

  // Travel
  {
    id: "schengen-flight-booking",
    category: "travel",
    name: "Flight Bookings",
    description: "Round-trip flight booking or itinerary showing entry and exit dates",
    required: true,
    examples: ["Flight confirmation from airline", "Booking reference"],
    acceptedFormats: ["PDF", "JPG"],
  },
  {
    id: "schengen-travel-insurance",
    category: "insurance",
    name: "Travel Medical Insurance",
    description: "Schengen-compliant travel insurance covering €30,000+ medical expenses",
    required: true,
    examples: ["Insurance policy document", "Insurance certificate"],
    acceptedFormats: ["PDF", "JPG"],
  },

  // Employment
  {
    id: "schengen-employment",
    category: "employment",
    name: "Employment Proof",
    description: "Employment letter, employment contract, or proof of self-employment",
    required: true,
    examples: ["Employment letter on company letterhead", "Contract", "Business registration"],
    acceptedFormats: ["PDF", "JPG"],
  },

  // Personal
  {
    id: "schengen-birth-certificate",
    category: "personal",
    name: "Birth Certificate",
    description: "Original birth certificate (optional but helpful for fast-track approval)",
    required: false,
    examples: ["Birth certificate with apostille"],
    acceptedFormats: ["PDF", "JPG"],
  },
];

export function getRequirementsByCategory(
  requirements: DocumentRequirement[]
): Map<DocumentCategory, DocumentRequirement[]> {
  const grouped = new Map<DocumentCategory, DocumentRequirement[]>();

  requirements.forEach((req) => {
    if (!grouped.has(req.category)) {
      grouped.set(req.category, []);
    }
    grouped.get(req.category)!.push(req);
  });

  return grouped;
}

export function getRequiredDocuments(
  requirements: DocumentRequirement[]
): DocumentRequirement[] {
  return requirements.filter((r) => r.required);
}

export const categoryLabels: Record<DocumentCategory, string> = {
  passport: "📋 Passport & ID",
  financial: "💳 Financial Documents",
  accommodation: "🏠 Accommodation",
  travel: "✈️ Travel Plans",
  employment: "💼 Employment",
  insurance: "🛡️ Insurance",
  personal: "👤 Personal Documents",
};

// ─────────────────────────────────────────
// Uganda Tourist Visa Requirements
// ─────────────────────────────────────────

export const ugandaTouristDocumentRequirements: DocumentRequirement[] = [
  // Passport
  {
    id: "uganda-passport",
    category: "passport",
    name: "Valid Passport",
    description: "Original passport with validity of at least 6 months from date of entry",
    required: true,
    examples: ["Any passport format", "Passport copy"],
    acceptedFormats: ["PDF", "JPG", "PNG"],
    notes: "Minimum 2 blank pages for visa stamp",
  },

  // Financial
  {
    id: "uganda-bank-statement",
    category: "financial",
    name: "Proof of Funds",
    description: "Bank statements or proof of financial means to cover your stay (minimum $2000)",
    required: true,
    examples: ["Bank statement", "Credit card", "Travelers cheques"],
    acceptedFormats: ["PDF", "JPG"],
  },

  // Accommodation
  {
    id: "uganda-accommodation",
    category: "accommodation",
    name: "Accommodation Booking",
    description: "Hotel reservation, Airbnb booking, or invitation letter from host",
    required: true,
    examples: ["Hotel confirmation", "Airbnb booking", "Host letter"],
    acceptedFormats: ["PDF", "JPG"],
  },

  // Travel
  {
    id: "uganda-flight-booking",
    category: "travel",
    name: "Flight Itinerary",
    description: "Return flight booking or confirmed travel dates",
    required: true,
    examples: ["Flight confirmation", "Booking reference"],
    acceptedFormats: ["PDF", "JPG"],
  },

  // Employment
  {
    id: "uganda-employment",
    category: "employment",
    name: "Employment Letter",
    description: "Letter from employer confirming leave of absence (if employed)",
    required: false,
    examples: ["Letter on company letterhead", "Employment contract"],
    acceptedFormats: ["PDF", "JPG"],
  },

  // Insurance
  {
    id: "uganda-travel-insurance",
    category: "insurance",
    name: "Travel Insurance",
    description: "Travel/medical insurance covering your stay in Uganda",
    required: false,
    examples: ["Insurance policy", "Certificate of insurance"],
    acceptedFormats: ["PDF", "JPG"],
  },

  // Personal
  {
    id: "uganda-yellow-fever",
    category: "personal",
    name: "Yellow Fever Vaccination",
    description: "Yellow fever vaccination certificate (recommended, required by some airlines)",
    required: false,
    examples: ["Vaccination certificate", "Yellow book"],
    acceptedFormats: ["PDF", "JPG"],
    notes: "Check with your airline for requirements",
  },
];
