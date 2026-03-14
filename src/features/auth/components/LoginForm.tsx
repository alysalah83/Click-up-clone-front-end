"use client";

import LogAndSignLayout from "./LogAndSignLayout";
import { startTransition, useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/features/auth/schema/authSchemas";
import { loginUser } from "../actions/login-user.action";
import FormInputWithLabel from "@/shared/ui/Input/FormInputWithLabel";
import { Button } from "@/shared/ui/Button";
import SignupGuestBtn from "./SignupGuestBtn";
import { ErrorResponse } from "@/shared/types/action.types";

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onBlur", resolver: zodResolver(loginSchema) });
  const [state, action, isPending] = useActionState(loginUser, null);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const onSubmit = function (data: FormData) {
    startTransition(() => {
      action({
        email: data.email,
        password: data.password,
      });
    });

    if (state && state.status === "error") setError(state.error);
  };

  return (
    <LogAndSignLayout page="login">
      <div className="flex flex-col gap-4">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <FormInputWithLabel
            icon="mail"
            label="Email"
            placeholder="Enter your email"
            inputType="email"
            errorMessage={errors.email?.message}
            disabled={isPending}
            register={register("email")}
            autoComplete="email"
          />
          <FormInputWithLabel
            icon="lock"
            label="Password"
            placeholder="Enter password"
            inputType="password"
            errorMessage={errors.password?.message}
            disabled={isPending}
            register={register("password")}
            autoComplete="current-password"
          />

          <Button
            type="colored"
            stretch={true}
            size="large"
            ariaLabel="login button"
            extraClasses="mt-2"
            disabled={isPending}
            pending={isPending}
            pendingSpinnerWidth="medium"
          >
            Login
          </Button>

          {error && (
            <ErrorMessage error={error.message} errorObject={error.errors} />
          )}
        </form>
        <div className="flex items-center gap-4">
          <span className="grow border-t border-neutral-300" />
          <p className="text-xl font-bold text-neutral-500">or</p>
          <span className="grow border-t border-neutral-300" />
        </div>
        <SignupGuestBtn stretch={true} />
      </div>
    </LogAndSignLayout>
  );
}

export default LoginForm;
