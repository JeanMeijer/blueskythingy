"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { env } from "@/env/server";
import { publicAction } from "@/lib/safe-action";
import { Session } from "@/lib/auth/server";

export const logoutAction = publicAction
  .metadata({ actionName: "logout" })
  .action(async () => {
    const session = await getIronSession<Session>(await cookies(), {
      password: env.COOKIE_SECRET,
      cookieName: "sid",
    });

    session.destroy();

    return redirect("/");
  });
