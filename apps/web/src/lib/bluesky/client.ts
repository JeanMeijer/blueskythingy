import type { IronSession } from "iron-session";
import { Agent } from "@atproto/api";
import type { Session } from "@/lib/auth/server";
import { oauthClient } from "./oauth-client";

interface CreateAuthenticatedClientParams {
  session: IronSession<Session>;
}

export async function createAuthenticatedClient(
  params: CreateAuthenticatedClientParams,
) {
  const oauthSession = await oauthClient.restore(params.session.did);

  if (!oauthSession) {
    return null;
  }

  return new Agent(oauthSession);
}

export async function createPublicClient() {
  return new Agent("https://api.bsky.app");
}
