"use client";

import { Button } from "@/shared/ui/Button";
import { signupGuest } from "../actions/signup-guest.action";
import { useActionState } from "react";

function SignupGuestBtn({ stretch = false }: { stretch?: boolean }) {
  const [_, action, isPending] = useActionState(signupGuest, null);

  return (
    <Button
      onClick={action}
      type="secondary"
      size="large"
      stretch={stretch}
      pending={isPending}
      ariaLabel="signup as guest button"
    >
      Continue as Guest
    </Button>
  );
}

export default SignupGuestBtn;
