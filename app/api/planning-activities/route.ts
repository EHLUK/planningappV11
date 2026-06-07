import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contractId = searchParams.get("contractId");

  if (!contractId) {
    return NextResponse.json({ error: "contractId is required" }, { status: 400 });
  }

  const activities = await prisma.lookaheadActivity.findMany({
    where: { contractId },
    orderBy: { createdAt: "asc" }
  });

  return NextResponse.json({ activities });
}

export async function POST(request: Request) {
  const body = await request.json();

  const activity = await prisma.lookaheadActivity.create({
    data: {
      contractId: body.contractId,
      activityCode: body.activityCode,
      title: body.title,
      ownerName: body.ownerName || null,
      area: body.area || null,
      startLabel: body.startLabel || null,
      finishLabel: body.finishLabel || null,
      status: body.status || "Planned",
      source: body.source || "Added"
    }
  });

  return NextResponse.json({ activity }, { status: 201 });
}
