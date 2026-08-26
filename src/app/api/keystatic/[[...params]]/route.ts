// src/app/api/keystatic/[[...params]]/route.ts
//
// This path is NOT arbitrary. The Keystatic Admin UI bundle hardcodes every
// API call to /api/keystatic/* (github/login, github/oauth/callback, tree,
// update, blob, ...). Moving this handler anywhere else makes the
// "Log in with GitHub" button 404 and the CMS unable to read or commit.
import { makeRouteHandler } from "@keystatic/next/route-handler";
import keystaticConfig from "../../../../../keystatic.config";

const handlers = makeRouteHandler({ config: keystaticConfig });

export const GET = handlers.GET;
export const POST = handlers.POST;
