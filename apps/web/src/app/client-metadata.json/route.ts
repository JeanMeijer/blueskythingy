import { NextResponse } from "next/server";
import { CLIENT_METADATA } from "@/lib/bluesky/client-metadata";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json(CLIENT_METADATA);
}
