import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { secret, paths } = await request.json();

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    const targets: string[] = Array.isArray(paths) ? paths : ["/"];
    for (const path of targets) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, paths: targets });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
