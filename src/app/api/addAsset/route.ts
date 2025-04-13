import { NextRequest, NextResponse } from "next/server";
import { addAsset } from "@/app/lib/actions";

export async function POST(req: NextRequest) {
  const data = await req.json();
  await addAsset(data);
  return NextResponse.json({ success: true });
}