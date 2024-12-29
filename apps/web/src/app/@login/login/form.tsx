"use client";

import { useRouter } from "next/navigation";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlueskyIcon } from "@/components/icons/bluesky";
import { loginSchema } from "./schema";
import { loginAction } from "./action";

export function LoginForm() {
  const router = useRouter();

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    loginAction,
    valibotResolver(loginSchema),
    {
      actionProps: {},
      formProps: {},
      errorMapProps: {},
    },
  );

  return (
    <Dialog open={true} onOpenChange={() => router.push("/")}>
      <DialogContent className="mx-auto w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in to Bluesky Thingy</DialogTitle>
          <DialogDescription>
            You need to login with your Bluesky account to continue
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 px-6" onSubmit={handleSubmitWithAction}>
          <div className="grid gap-3">
            <Label htmlFor="handle">Bluesky handle</Label>
            <Input
              id="handle"
              type="text"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="username"
              placeholder="example.bsky.social"
              required
              disabled={action.isPending}
              {...form.register("handle")}
            />
            {form.formState.errors.handle ? (
              <p
                className="mt-2 text-xs text-destructive"
                role="alert"
                aria-live="polite"
              >
                {form.formState.errors.handle.message}
              </p>
            ) : null}
          </div>
          <Button
            type="submit"
            className="w-full gap-1"
            variant="bluesky"
            disabled={action.isPending}
          >
            <BlueskyIcon className="size-8 fill-white" />
            Login with Bluesky
          </Button>
        </form>
        <DialogFooter className="sm:justify-center">
          <p className="text-xs text-muted-foreground text-pretty text-center max-w-80 leading-relaxed">
            By clicking on &#34;Login with Bluesky&#34;, you agree to our Terms of Service and Privacy Policy.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
