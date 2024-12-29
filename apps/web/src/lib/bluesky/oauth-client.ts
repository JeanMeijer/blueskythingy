import { NodeOAuthClient } from "@atproto/oauth-client-node";
import { db } from "@repo/db";
import { CLIENT_METADATA } from "@/lib/bluesky/client-metadata";
import { SessionStore } from "./session-store";
import { StateStore } from "./state-store";

export const oauthClient = new NodeOAuthClient({
  clientMetadata: CLIENT_METADATA,
  sessionStore: new SessionStore(db),
  stateStore: new StateStore(db),
});
