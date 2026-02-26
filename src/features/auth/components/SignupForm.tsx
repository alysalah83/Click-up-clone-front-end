"use client";

import LogAndSignLayout from "./LogAndSignLayout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupUserSchema } from "@/features/auth/schema/authSchemas";
import { signupUser } from "../actions/signup-user.action";
import FormInputWithLabel from "@/shared/ui/Input/FormInputWithLabel";
import { Button } from "@/shared/ui/Button";
import SignupGuestBtn from "./SignupGuestBtn";
import {
  ActionErrorResponse,
  ErrorResponse,
} from "@/shared/types/action.types";

interface FormData {
  name: string;
  email: string;
  password: string;
}

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(signupUserSchema),
  });
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const onSubmit = async function (data: FormData) {
    setIsPending(true);
    const response = await signupUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    setIsPending(false);
    if (response.status === "error") setError(error);
  };

  return (
    <LogAndSignLayout page="signup">
      <div className="flex flex-col gap-4">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <FormInputWithLabel
            icon="user"
            label="Full Name"
            placeholder="Aly Salah"
            inputType="text"
            errorMessage={errors.name?.message}
            disabled={isPending}
            register={register("name")}
            autoComplete="name"
          />
          <FormInputWithLabel
            icon="mail"
            label="Email"
            placeholder="email@example.com"
            inputType="email"
            errorMessage={errors.email?.message}
            disabled={isPending}
            register={register("email")}
            autoComplete="email"
          />
          <FormInputWithLabel
            icon="lock"
            label="Choose Password"
            placeholder="Minimum 8 charter"
            inputType="password"
            errorMessage={errors.password?.message}
            disabled={isPending}
            register={register("password")}
            autoComplete="new-password"
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
            Create account
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

export default SignupForm;
