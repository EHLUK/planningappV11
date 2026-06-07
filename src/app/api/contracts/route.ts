import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const contracts = await prisma.contract.findMany({
    orderBy: { updatedAt: "desc" }
  });

  return NextResponse.json({ contracts });
}

export async function POST(request: Request) {
  const body = await request.json();

  const contract = await prisma.contract.create({
    data: {
      name: body.name,
      code: body.code,
      client: body.client || null,
      contractor: body.contractor || null,
      necOption: body.necOption || null,
      startingDate: body.startingDate ? new Date(body.startingDate) : null,
      completionDate: body.completionDate ? new Date(body.completionDate) : null,
      reportingPeriod: body.reportingPeriod || null,
      contractManager: body.contractManager || null,
      planner: body.planner || null,
      commercialLead: body.commercialLead || null,
      projectManager: body.projectManager || null,
      disciplines: body.disciplines || null,
      areas: body.areas || null,
      aiTone: body.aiTone || null,
      reportBranding: body.reportBranding || null,
      status: body.status || "draft"
    }
  });

  return NextResponse.json({ contract }, { status: 201 });
}
