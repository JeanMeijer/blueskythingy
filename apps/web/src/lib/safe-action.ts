import { createSafeActionClient } from "next-safe-action";
import { valibotAdapter } from "next-safe-action/adapters/valibot";
import * as v from "valibot";

export const publicAction = createSafeActionClient({
  validationAdapter: valibotAdapter(),
  defineMetadataSchema() {
    return v.object({
      actionName: v.string(),
    });
  },
}).use(async ({ next }) => {
  return next();
});
