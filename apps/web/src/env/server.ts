import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    DATABASE_URL: z.string().url().startsWith("postgresql://"),
    COOKIE_SECRET: z
      .string()
      .min(32, "Iron session secret must be at least 32 characters long"),
    TUNNEL_URL: z.string().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    TUNNEL_URL: process.env.TUNNEL_URL,
  },
  extends: [vercel()],
  skipValidation: process.env.NODE_ENV !== "production",
});
