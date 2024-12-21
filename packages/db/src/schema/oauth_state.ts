import { pgTable, jsonb, text, timestamp } from "drizzle-orm/pg-core";
import type { NodeSavedState } from "@atproto/oauth-client-node";

export const oauthState = pgTable("oauth_state", {
  key: text().primaryKey(),

  value: jsonb().notNull().$type<NodeSavedState>(),

  createdAt: timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
});
