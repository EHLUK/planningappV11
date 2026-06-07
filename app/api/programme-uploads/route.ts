import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contractId = searchParams.get("contractId");

  if (!contractId) {
    return NextResponse.json({ error: "contractId is required" }, { status: 400 });
  }

  const uploads = await prisma.programmeUpload.findMany({
    where: { contractId },
    orderBy: { uploadedAt: "desc" }
  });

  return NextResponse.json({ uploads });
}

export async function POST(request: Request) {
  const body = await request.json();

  const upload = await prisma.programmeUpload.create({
    data: {
      contractId: body.contractId,
      fileName: body.fileName,
      sourceType: body.sourceType || "xer",
      uploadType: body.uploadType,
      dataDate: body.dataDate ? new Date(body.dataDate) : null,
      plannedCompletion: body.plannedCompletion ? new Date(body.plannedCompletion) : null,
      sourceUri: body.sourceUri || null,
      uploadedBy: body.uploadedBy || null
    }
  });

  return NextResponse.json({ upload }, { status: 201 });
}
