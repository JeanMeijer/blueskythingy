import { unstable_cache, revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import type {
  NodeSavedSession,
  NodeSavedSessionStore,
} from "@atproto/oauth-client-node";
import type { Database } from "@repo/db";
import { oauthSession } from "@repo/db/schema";

async function getSession(db: Database, key: string) {
  const session = await db.query.oauthSession.findFirst({
    where: eq(oauthSession.key, key),
  });

  if (!session) {
    return;
  }

  return session.value;
}

export class SessionStore implements NodeSavedSessionStore {
  constructor(private db: Database) {}

  async get(key: string): Promise<NodeSavedSession | undefined> {
    const getCachedSession = unstable_cache(
      async (key: string) => getSession(this.db, key),
      [`oauth.session:${key}`],
    );

    return await getCachedSession(key);
  }

  async set(key: string, val: NodeSavedSession) {
    await this.db
      .insert(oauthSession)
      .values({
        key,
        value: val,
        expiresAt: val.tokenSet.expires_at,
      })
      .onConflictDoUpdate({
        target: oauthSession.key,
        set: { value: val, expiresAt: val.tokenSet.expires_at },
      });

    revalidateTag(`oauth.session:${key}`);
  }

  async del(key: string) {
    await this.db.delete(oauthSession).where(eq(oauthSession.key, key));

    revalidateTag(`oauth.session:${key}`);
  }
}
