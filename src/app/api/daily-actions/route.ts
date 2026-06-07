import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contractId = searchParams.get("contractId");

  if (!contractId) {
    return NextResponse.json({ error: "contractId is required" }, { status: 400 });
  }

  const actions = await prisma.dailyAction.findMany({
    where: { contractId },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ actions });
}

export async function POST(request: Request) {
  const body = await request.json();

  const action = await prisma.dailyAction.create({
    data: {
      contractId: body.contractId,
      title: body.title,
      ownerName: body.ownerName || null,
      dueLabel: body.dueLabel || null,
      status: body.status || "Open",
      activityCode: body.activityCode || null
    }
  });

  return NextResponse.json({ action }, { status: 201 });
}
