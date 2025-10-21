import { arcanaService } from "../..";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const arcana = arcanaService.getArcanaById(params.id);

    return NextResponse.json(arcana);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
