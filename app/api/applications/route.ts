import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      fullName,
      phone,
      citizenship,
      destination,
      passportNumber,
      dateOfBirth,
      selectedPlan,
    } = body || {};

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find or create user by email
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: fullName || undefined,
          phone: phone || undefined,
          country: citizenship || undefined,
        },
      });
    }

    // Create application record
    const application = await prisma.application.create({
      data: {
        userId: user.id,
        fromCountry: citizenship || "",
        toCountry: destination || "",
        visaType: selectedPlan || "schengen",
        status: "DRAFT",
      },
    });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error) {
    console.error("Create application error:", error);
    return NextResponse.json({ error: "Failed to create application" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required to list applications" },
        { status: 400 }
      );
    }

    const applications = await prisma.application.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        documents: true,
        checklist: true,
      },
    });

    return NextResponse.json({ success: true, applications });
  } catch (error) {
    console.error("List applications error:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
