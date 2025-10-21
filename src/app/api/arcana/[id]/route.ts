import { IArcana } from "@/types/arcana";
import { arcanaService } from "../..";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const arcana : IArcana = arcanaService.getArcanaById(params.id);

    return NextResponse.json(arcana);
  } catch (error) {
    let message = "Arcana non trouvée";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 404 });
  }
}
