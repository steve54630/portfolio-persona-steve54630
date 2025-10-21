import { NextRequest, NextResponse } from "next/server";
import { skillService } from "../..";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const skill = skillService.findSkillById((await params).id);

  if (!skill) {
    return NextResponse.json({ error: "Skill non trouvé" }, { status: 404 });
  }

  return NextResponse.json(skill);
}
