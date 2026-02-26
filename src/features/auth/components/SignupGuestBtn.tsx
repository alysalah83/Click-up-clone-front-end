"use client";

import { Button } from "@/shared/ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupGuest } from "../api/auth.client";

function SignupGuestBtn({ stretch = false }: { stretch?: boolean }) {
  const [isPending, setIsPending] = useState(false);
  // const [_, action, isPending] = useActionState(signupGuest, null);
  const { replace } = useRouter();

  return (
    <Button
      onClick={async () => {
        setIsPending(true);
        await signupGuest();
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
