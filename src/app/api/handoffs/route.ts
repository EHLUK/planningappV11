import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contractId = searchParams.get("contractId");

  if (!contractId) {
    return NextResponse.json({ error: "contractId is required" }, { status: 400 });
  }

  const handoffs = await prisma.handoff.findMany({
    where: { contractId },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ handoffs });
}

export async function POST(request: Request) {
  const body = await request.json();

  const handoff = await prisma.handoff.create({
    data: {
      contractId: body.contractId,
      title: body.title,
      fromOwner: body.fromOwner || null,
      toOwner: body.toOwner || null,
      dueLabel: body.dueLabel || null,
      status: body.status || "Pending",
      activityCode: body.activityCode || null
    }
  });

  return NextResponse.json({ handoff }, { status: 201 });
}
