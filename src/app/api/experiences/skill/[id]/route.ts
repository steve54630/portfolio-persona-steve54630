import { NextRequest, NextResponse } from "next/server";
import { experienceService } from "../../..";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const experiences = experienceService.filterExperiencesBySkill(
      (await params).id
    );

    return NextResponse.json(experiences);
  } catch (error) {
    let message = "Expériences non trouvées";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 404 });
  }
}
