import { statusService } from "..";
import { NextResponse, NextRequest } from "next/server";

export async function GET(_: NextRequest) {
    return NextResponse.json(statusService.getStatus());
}