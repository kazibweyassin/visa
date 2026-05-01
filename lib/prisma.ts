// lib/prisma.ts
import { PrismaClient } from "./generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Client } from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  (() => {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(client);
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["query"] : [],
    });
  })();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
