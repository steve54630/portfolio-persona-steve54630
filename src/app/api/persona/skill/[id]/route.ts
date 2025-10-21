import { NextRequest, NextResponse } from "next/server";
import { personaService } from "../../..";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const personas = personaService.filterPersonasBySkill((await params).id);

    return NextResponse.json(personas);
  } catch (error) {
    let message = "Personas non trouvées";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 404 });
  }
}
