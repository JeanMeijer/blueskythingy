import { eq } from "drizzle-orm";
import type {
  NodeSavedSession,
  NodeSavedSessionStore,
} from "@atproto/oauth-client-node";
import type { Database } from "@repo/db";
import { oauthSession } from "@repo/db/schema";

export class SessionStore implements NodeSavedSessionStore {
  constructor(private db: Database) {}

  async get(key: string): Promise<NodeSavedSession | undefined> {
    const session = await this.db.query.oauthSession.findFirst({
      where: eq(oauthSession.key, key),
    });

    if (!session) {
      return;
    }

    return session.value;
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
  }

  async del(key: string) {
    await this.db.delete(oauthSession).where(eq(oauthSession.key, key));
  }
}
