import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import type { Session } from "@/lib/auth/server";
import { oauthClient } from "@/lib/bluesky/oauth-client";
import { env } from "@/env/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  try {
    const { session } = await oauthClient.callback(params);

    const clientSession = await getIronSession<Session>(await cookies(), {
      cookieName: "sid",
      password: env.COOKIE_SECRET,
    });

    if (clientSession.did === session.did) {
      return redirect("/");
    }

    clientSession.did = session.did;

    await clientSession.save();
  } catch (err) {
    console.error(err);

    return redirect("/login?error=oauth_callback_failed");
  }

  return redirect("/");
}
