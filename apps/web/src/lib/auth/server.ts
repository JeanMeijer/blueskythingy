import "server-only";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { env } from "@/env/server";

const LOGIN_URL = "/login";

export interface Session {
  did: string;
  handle: string;
}

function redirectToSignIn() {
  return redirect(LOGIN_URL);
}

export async function auth() {
  const clientSession = await getIronSession<Session>(await cookies(), {
    cookieName: "sid",
    password: env.COOKIE_SECRET,
  });

  if (!clientSession.did) {
    return {
      isSignedIn: false,
      user: null,
      redirectToSignIn,
    }
  }

  return { 
    isSignedIn: true,
    user: {
      did: clientSession.did,
      handle: clientSession.handle,
    },
    redirectToSignIn,
  };
}