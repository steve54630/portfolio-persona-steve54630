import { NextRequest, NextResponse } from "next/server";
import { personaService } from "../../..";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const personas = personaService.filterPersonasBySkill(params.id);

    return NextResponse.json(personas);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
