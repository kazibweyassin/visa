// lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL in environment");
}

const adapter = new PrismaPg({ connectionString });

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["query"] : [],
});

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
