import { pgTable, jsonb, text, timestamp } from "drizzle-orm/pg-core";
import type { NodeSavedSession } from "@atproto/oauth-client-node";

export const oauthSession = pgTable("oauth_session", {
  key: text().primaryKey(),

  value: jsonb().notNull().$type<NodeSavedSession>(),

  expiresAt: timestamp({ mode: "string", withTimezone: true }),

  createdAt: timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
});
