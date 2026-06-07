import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(_request: Request, context: RouteContext) {
  const contract = await prisma.contract.findUnique({
    where: { id: context.params.id }
  });

  if (!contract) {
    return NextResponse.json({ error: "Contract not found" }, { status: 404 });
  }

  return NextResponse.json({ contract });
}

export async function PATCH(request: Request, context: RouteContext) {
  const body = await request.json();

  const contract = await prisma.contract.update({
    where: { id: context.params.id },
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

  return NextResponse.json({ contract });
}
