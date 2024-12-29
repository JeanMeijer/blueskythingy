import { NextResponse } from "next/server";
import { CLIENT_METADATA } from "@/lib/bluesky/client-metadata";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(CLIENT_METADATA);
}
