"use client";

import { Button } from "@/shared/ui/Button";
import { signupGuest } from "../actions/signup-guest.action";
import { useActionState, useState } from "react";
import { authServices } from "../services/auth.service";
import { useRouter } from "next/navigation";

function SignupGuestBtn({ stretch = false }: { stretch?: boolean }) {
  const [isPending, setIsPending] = useState(false);
  // const [_, action, isPending] = useActionState(signupGuest, null);
  const { replace } = useRouter();

  return (
    <Button
      onClick={async () => {
        setIsPending(true);
        await authServices.signupGuest();
        replace("/home/overview");
        setIsPending(false);
      }}
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
