// src/app/api/keystatic/[[...params]]/route.ts
//
// This path is NOT arbitrary. The Keystatic Admin UI bundle hardcodes every
// API call to /api/keystatic/* (github/login, github/oauth/callback, tree,
// update, blob, ...). Moving this handler anywhere else makes the
// "Log in with GitHub" button 404 and the CMS unable to read or commit.
import { makeRouteHandler } from "@keystatic/next/route-handler";
import { cookies } from "next/headers";
import keystaticConfig from "../../../../../keystatic.config";

const handlers = makeRouteHandler({ config: keystaticConfig });

// Keystatic's OAuth flow hits these endpoints before a session exists, so they
// must remain public. Everything else (tree, blob, update) is gated.
const PUBLIC_KEYSTATIC_PATHS = new Set([
  "github/login",
  "github/oauth/callback",
  "github/refresh-token",
  "github/repo-not-found",
  "github/logout",
  "github/created-app",
]);

function isPublicKeystaticPath(pathname: string): boolean {
  // /api/keystatic/<...> — strip the /api/keystatic prefix and check the rest.
  const stripped = pathname.replace(/^\/api\/keystatic\/?/, "");
  return PUBLIC_KEYSTATIC_PATHS.has(stripped);
}

async function hasAdminSession(): Promise<boolean> {
  // The Keystatic GitHub storage flow sets `keystatic-gh-access-token` once
  // the OAuth dance completes. Its presence indicates a successfully
  // authenticated CMS editor. In local mode the dev server is the only
  // caller, and the local API handler bypasses this file entirely.
  try {
    const store = await cookies();
    return Boolean(
      store.get("keystatic-gh-access-token")?.value ||
        store.get("keystatic-gh-refresh-token")?.value,
    );
  } catch {
    return false;
  }
}

async function gate(req: Request): Promise<Response | null> {
  if (process.env.NODE_ENV !== "production") return null;
  const url = new URL(req.url);
  if (isPublicKeystaticPath(url.pathname)) return null;
  if (await hasAdminSession()) return null;
  return new Response("Not Found", { status: 404 });
}

export async function GET(req: Request) {
  const block = await gate(req);
  return block ?? handlers.GET(req);
}

export async function POST(req: Request) {
  const block = await gate(req);
  return block ?? handlers.POST(req);
}
