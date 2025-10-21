import { NextRequest, NextResponse } from "next/server";
import { personaService } from "..";

export async function GET(_: NextRequest) {
  return NextResponse.json(personaService.getPersonas());
}
