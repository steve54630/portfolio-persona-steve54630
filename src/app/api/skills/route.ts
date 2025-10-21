import { NextRequest, NextResponse } from "next/server";
import { skillService } from "..";

export async function GET(_: NextRequest) {
  return NextResponse.json(skillService.getSkills());
}
