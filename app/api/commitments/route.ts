import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contractId = searchParams.get("contractId");

  if (!contractId) {
    return NextResponse.json({ error: "contractId is required" }, { status: 400 });
  }

  const commitments = await prisma.commitment.findMany({
    where: { contractId },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ commitments });
}

export async function POST(request: Request) {
  const body = await request.json();

  const commitment = await prisma.commitment.create({
    data: {
      contractId: body.contractId,
      title: body.title,
      ownerName: body.ownerName || null,
      dueLabel: body.dueLabel || null,
      status: body.status || "Promised",
      activityCode: body.activityCode || null
    }
  });

  return NextResponse.json({ commitment }, { status: 201 });
}
