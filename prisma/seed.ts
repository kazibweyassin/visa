import { PrismaClient } from "@prisma/client";
import { schengenDocumentRequirements, ugandaTouristDocumentRequirements } from "../lib/document-requirements";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Seed Schengen document requirements
  console.log("📍 Adding Schengen visa requirements...");
  for (const req of schengenDocumentRequirements) {
    await prisma.documentRequirement.upsert({
      where: { id: req.id },
      update: {},
      create: {
        id: req.id,
        visaType: "schengen",
        category: req.category,
        name: req.name,
        description: req.description,
        isRequired: req.required,
        acceptedFormats: JSON.stringify(req.acceptedFormats),
        notes: req.notes,
      },
    });
  }

  // Seed Uganda tourist visa requirements
  console.log("🇺🇬 Adding Uganda tourist visa requirements...");
  for (const req of ugandaTouristDocumentRequirements) {
    await prisma.documentRequirement.upsert({
      where: { id: req.id },
      update: {},
      create: {
        id: req.id,
        visaType: "uganda_tourist",
        category: req.category,
        name: req.name,
        description: req.description,
        isRequired: req.required,
        acceptedFormats: JSON.stringify(req.acceptedFormats),
        notes: req.notes,
      },
    });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
