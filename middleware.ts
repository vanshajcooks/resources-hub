import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 30; // per IP per window

const ipRequests = new Map<string, { count: number; lastRequest: number }>();

export function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown-ip";

  const now = Date.now();
  const record = ipRequests.get(ip);

  if (!record) {
    ipRequests.set(ip, { count: 1, lastRequest: now });
    return NextResponse.next();
  }

  // Reset window
  if (now - record.lastRequest > RATE_LIMIT_WINDOW) {
    ipRequests.set(ip, { count: 1, lastRequest: now });
    return NextResponse.next();
  }

  record.count += 1;
  record.lastRequest = now;

  if (record.count > MAX_REQUESTS) {
    return new NextResponse(
      JSON.stringify({
        error: "Too many requests. Please slow down.",
      }),
      {
        status: 429,
        headers: { "content-type": "application/json" },
      }
    );
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/api/auth/:path*", "/roadmaps/:path*"],
};
