import { NodeOAuthClient, type OAuthClientMetadataInput } from "@atproto/oauth-client-node";
import { db } from "@repo/db";
import { SessionStore } from "./session-store";
import { StateStore } from "./state-store";
import { BASE_URL } from "../base-url";

export const CLIENT_METADATA: OAuthClientMetadataInput = {
  "client_id": `${BASE_URL}/client-metadata.json`,
  "application_type": "web",
  "client_name": "Blueskythingy",
  "client_uri": BASE_URL,
  "grant_types": [
    "authorization_code",
    "refresh_token"
  ],
  "redirect_uris": [
    `${BASE_URL}/api/oauth/callback`,
  ],
  "response_types": [
    "code"
  ],
  "scope": "atproto transition:generic",
  "token_endpoint_auth_method": "none"
};

export const oauthClient = new NodeOAuthClient({
  clientMetadata: CLIENT_METADATA,
  sessionStore: new SessionStore(db),
  stateStore: new StateStore(db),
});
