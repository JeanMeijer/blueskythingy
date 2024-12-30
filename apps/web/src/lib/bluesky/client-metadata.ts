import type { OAuthClientMetadataInput } from "@atproto/oauth-client-node";
import { env } from "@/env/server";

function getClientUrl() {
  if (env.VERCEL_ENV === "production") {
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`;
  }

  return `https://${env.TUNNEL_URL}`;
}

export const CLIENT_URL = getClientUrl();

export const CLIENT_METADATA: OAuthClientMetadataInput = {
  client_id: `${CLIENT_URL}/client-metadata.json`,
  application_type: "web",
  client_name: "Blueskythingy",
  client_uri: CLIENT_URL,
  grant_types: ["authorization_code", "refresh_token"],
  redirect_uris: [`${CLIENT_URL}/oauth/callback`],
  response_types: ["code"],
  scope: "atproto transition:generic",
  dpop_bound_access_tokens: true,
  token_endpoint_auth_method: "none",
};
