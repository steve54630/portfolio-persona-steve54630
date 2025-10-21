import { IPersona } from "@/types/persona";
import { personaService } from "../..";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  try {
    const persona : IPersona = personaService.findPersonaById(id);

    return NextResponse.json(persona);
  } catch (error) {
    let message = "Persona non trouvée";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 404 });
  }
}
