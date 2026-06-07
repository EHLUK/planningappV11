import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contractId = searchParams.get("contractId");

  if (!contractId) {
    return NextResponse.json({ error: "contractId is required" }, { status: 400 });
  }

  const constraints = await prisma.constraint.findMany({
    where: { contractId },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ constraints });
}

export async function POST(request: Request) {
  const body = await request.json();

  const constraint = await prisma.constraint.create({
    data: {
      contractId: body.contractId,
      activityCode: body.activityCode || null,
      title: body.title,
      type: body.type || null,
      ownerName: body.ownerName || null,
      dueLabel: body.dueLabel || null,
      status: body.status || "Open"
    }
  });

  return NextResponse.json({ constraint }, { status: 201 });
}
