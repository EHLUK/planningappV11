import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contractId = searchParams.get("contractId");

  if (!contractId) {
    return NextResponse.json({ error: "contractId is required" }, { status: 400 });
  }

  const resources = await prisma.contractResource.findMany({
    where: { contractId, active: true },
    orderBy: { name: "asc" }
  });

  return NextResponse.json({ resources });
}

export async function POST(request: Request) {
  const body = await request.json();

  const resource = await prisma.contractResource.create({
    data: {
      contractId: body.contractId,
      name: body.name,
      role: body.role || null,
      discipline: body.discipline || null,
      dailyCapacity: body.dailyCapacity ? Number(body.dailyCapacity) : null,
      availability: body.availability || "Available"
    }
  });

  return NextResponse.json({ resource }, { status: 201 });
}
