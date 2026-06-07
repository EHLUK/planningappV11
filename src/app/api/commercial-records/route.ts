import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contractId = searchParams.get("contractId");

  if (!contractId) {
    return NextResponse.json({ error: "contractId is required" }, { status: 400 });
  }

  const commercialRecords = await prisma.commercialControlRecord.findMany({
    where: { contractId },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ commercialRecords });
}

export async function POST(request: Request) {
  const body = await request.json();

  const commercialRecord = await prisma.commercialControlRecord.create({
    data: {
      contractId: body.contractId,
      recordType: body.recordType,
      reference: body.reference,
      title: body.title,
      ownerName: body.ownerName || null,
      status: body.status || "Draft",
      dueLabel: body.dueLabel || null,
      activityCode: body.activityCode || null
    }
  });

  return NextResponse.json({ commercialRecord }, { status: 201 });
}
