import { unstable_cache, revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import type {
  NodeSavedState,
  NodeSavedStateStore,
} from "@atproto/oauth-client-node";
import type { Database } from "@repo/db";
import { oauthState } from "@repo/db/schema";

async function getState(
  db: Database,
  key: string,
): Promise<NodeSavedState | undefined> {
  const state = await db.query.oauthState.findFirst({
    where: eq(oauthState.key, key),
  });

  if (!state) {
    return;
  }

  return state.value;
}

export class StateStore implements NodeSavedStateStore {
  constructor(private db: Database) {}

  async get(key: string): Promise<NodeSavedState | undefined> {
    const getCachedState = unstable_cache(
      async (key: string) => getState(this.db, key),
      [`oauth.state:${key}`],
    );

    return await getCachedState(key);
  }

  async set(key: string, val: NodeSavedState) {
    await this.db
      .insert(oauthState)
      .values({
        key,
        value: val,
      })
      .onConflictDoUpdate({
        target: oauthState.key,
        set: {
          value: val,
        },
      });

    revalidateTag(`oauth.state:${key}`);
  }

  async del(key: string) {
    await this.db.delete(oauthState).where(eq(oauthState.key, key));

    revalidateTag(`oauth.state:${key}`);
  }
}
