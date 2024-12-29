import * as v from "valibot";

export const loginSchema = v.object({
  handle: v.pipe(v.string(), v.trim()),
});
