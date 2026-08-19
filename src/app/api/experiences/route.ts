import { NextRequest, NextResponse } from "next/server";
import { experienceService } from "..";

export async function GET(_: NextRequest) {
  return NextResponse.json(experienceService.getExperiences());
}
