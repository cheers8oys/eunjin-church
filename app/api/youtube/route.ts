import { NextResponse } from "next/server";
import { getSermons } from "@/lib/youtube";

export async function GET() {
  try {
    const sermons = await getSermons(50);
    return NextResponse.json(
      { sermons },
      { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch (err) {
    console.error("[youtube API]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
