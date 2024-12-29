"use server";

import { redirect } from "next/navigation";
import { publicAction } from "@/lib/safe-action";
import { oauthClient } from "@/lib/bluesky/oauth-client";
import { CLIENT_URL } from "@/lib/bluesky/client-metadata";
import { loginSchema } from "./schema";

export const loginAction = publicAction
  .metadata({ actionName: "login" })
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    const url = await oauthClient.authorize(parsedInput.handle, {
      scope: "atproto transition:generic",
      // @ts-expect-error -- client library typing is too strict
      redirect_uri: `${CLIENT_URL}/oauth/callback`,
    });

    return redirect(url.toString());
  });
