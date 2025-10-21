import { NextRequest, NextResponse } from "next/server";
import { categoryService } from "..";

export async function GET(_:NextRequest) {
    
    return NextResponse.json(categoryService.getCategories());

}