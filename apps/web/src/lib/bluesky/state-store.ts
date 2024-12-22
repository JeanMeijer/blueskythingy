import { eq } from "drizzle-orm";
import type {
  NodeSavedState,
  NodeSavedStateStore,
} from "@atproto/oauth-client-node";
import type { Database } from "@repo/db";
import { oauthState } from "@repo/db/schema";

export class StateStore implements NodeSavedStateStore {
  constructor(private db: Database) {}

  async get(key: string): Promise<NodeSavedState | undefined> {
    const state = await this.db.query.oauthState.findFirst({
      where: eq(oauthState.key, key),
    });

    if (!state) {
      return;
    }

    return state.value;
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
  }

  async del(key: string) {
    await this.db.delete(oauthState).where(eq(oauthState.key, key));
  }
}
