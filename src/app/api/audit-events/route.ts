import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contractId = searchParams.get("contractId");

  if (!contractId) {
    return NextResponse.json({ error: "contractId is required" }, { status: 400 });
  }

  const events = await prisma.auditEvent.findMany({
    where: { contractId },
    orderBy: { createdAt: "desc" },
    take: 100
  });

  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  const body = await request.json();

  const event = await prisma.auditEvent.create({
    data: {
      contractId: body.contractId,
      action: body.action,
      detail: body.detail
    }
  });

  return NextResponse.json({ event }, { status: 201 });
}
