import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function PATCH(request: Request, context: RouteContext) {
  const body = await request.json();

  const activity = await prisma.lookaheadActivity.update({
    where: { id: context.params.id },
    data: {
      title: body.title,
      ownerName: body.ownerName,
      area: body.area,
      startLabel: body.startLabel,
      finishLabel: body.finishLabel,
      status: body.status,
      source: body.source
    }
  });

  return NextResponse.json({ activity });
}
