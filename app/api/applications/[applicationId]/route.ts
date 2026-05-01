import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> }
) {
  try {
    const { applicationId } = await params;
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch application with related data
    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
        userId: userId,
      },
      include: {
        documents: {
          include: {
            requirement: true,
            review: true,
          },
        },
        checklist: {
          include: {
            requirement: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Calculate progress by category
    const byCategory = new Map<string, { total: number; completed: number }>();
    
    for (const item of application.checklist) {
      const cat = item.requirement.category;
      if (!byCategory.has(cat)) {
        byCategory.set(cat, { total: 0, completed: 0 });
      }
      const progress = byCategory.get(cat);
      if (progress) {
        progress.total += 1;
        if (item.isCompleted) progress.completed += 1;
      }
    }

    const categoryProgress: Record<string, any> = {};
    for (const [cat, stats] of byCategory) {
      categoryProgress[cat] = {
        ...stats,
        percentage: Math.round((stats.completed / stats.total) * 100),
      };
    }

    return NextResponse.json(
      {
        success: true,
        application: {
          id: application.id,
          fromCountry: application.fromCountry,
          toCountry: application.toCountry,
          visaType: application.visaType,
          status: application.status,
          progress: application.progress,
          createdAt: application.createdAt,
          updatedAt: application.updatedAt,
          submittedAt: application.submittedAt,
          documents: application.documents.map((doc: any) => ({
            id: doc.id,
            requirementId: doc.requirementId,
            requirement: {
              name: doc.requirement.name,
              category: doc.requirement.category,
            },
            fileName: doc.fileName,
            fileSize: doc.fileSize,
            status: doc.status,
            uploadedAt: doc.uploadedAt,
            review: doc.review ? {
              status: doc.review.status,
              feedback: doc.review.feedback,
            } : null,
          })),
          categoryProgress,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json(
      { error: "Failed to fetch application" },
      { status: 500 }
    );
  }
}
