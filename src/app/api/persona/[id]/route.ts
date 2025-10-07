import { personaService } from "../..";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  try {
    const persona = personaService.findPersonaById(id);

    return NextResponse.json(persona);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
