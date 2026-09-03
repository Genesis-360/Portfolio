import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const ALLOW_ORIGIN = "*";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "llms.txt");
    const body = await readFile(filePath, "utf-8");
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": ALLOW_ORIGIN,
      },
    });
  } catch {
    return new NextResponse("llms.txt not found", { status: 404 });
  }
}
