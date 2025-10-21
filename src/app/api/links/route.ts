import { NextRequest, NextResponse } from "next/server";
import { linksService } from "..";

export async function GET(_: NextRequest) {
  return NextResponse.json(linksService.getLinks());
}
