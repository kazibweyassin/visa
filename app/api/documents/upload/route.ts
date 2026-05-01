import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FORMATS = ["pdf", "jpg", "jpeg", "png"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const requirementId = formData.get("requirementId") as string;
    const applicationId = formData.get("applicationId") as string;
    const userId = formData.get("userId") as string;

    // Validation
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!requirementId || !applicationId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` },
        { status: 400 }
      );
    }

    const fileExt = file.name.split(".").pop()?.toLowerCase();
    if (!fileExt || !ALLOWED_FORMATS.includes(fileExt)) {
      return NextResponse.json(
        {
          error: `File type not allowed. Accepted formats: ${ALLOWED_FORMATS.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // Verify application ownership
    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
        userId: userId,
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // TODO: Upload file to cloud storage (AWS S3, Google Cloud Storage, etc.)
    // For now, generate a mock URL
    const fileUrl = `https://storage.example.com/${userId}/${applicationId}/${requirementId}/${file.name}`;

    // Save to database
    const uploadedDocument = await prisma.uploadedDocument.create({
      data: {
        userId,
        applicationId,
        requirementId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileUrl,
        status: "PENDING",
      },
    });

    // Update checklist progress
    await prisma.checklistProgress.upsert({
      where: {
        applicationId_requirementId: {
          applicationId,
          requirementId,
        },
      },
      update: {
        isCompleted: true,
        completedAt: new Date(),
      },
      create: {
        applicationId,
        requirementId,
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    // Update application progress
    const totalRequired = await prisma.documentRequirement.count({
      where: {
        visaType: "schengen",
        isRequired: true,
      },
    });

    const completed = await prisma.checklistProgress.count({
      where: {
        applicationId,
        isCompleted: true,
      },
    });

    const progress = Math.round((completed / totalRequired) * 100);

    await prisma.application.update({
      where: { id: applicationId },
      data: { progress },
    });

    return NextResponse.json(
      {
        success: true,
        documentId: uploadedDocument.id,
        message: "File uploaded successfully",
        file: {
          id: uploadedDocument.id,
          name: uploadedDocument.fileName,
          size: uploadedDocument.fileSize,
          type: uploadedDocument.fileType,
          uploadedAt: uploadedDocument.uploadedAt,
          status: uploadedDocument.status,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
