"use client";

import Button from "@/components/common/Button";
import LogAndSignLayout from "./LogAndSignLayout";
import FormInputWithLabel from "@/components/common/FormInputWithLabel";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/common/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/features/auth/validations/authSchemas";
import { signupUser } from "../actions/auth.actions.ts";

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
    resolver: zodResolver(signupSchema),
  });
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async function (data: FormData) {
    setIsPending(true);
    const error = await signupUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (typeof error === "string") setErrorMessage(error);
    setIsPending(false);
  };

  return (
    <LogAndSignLayout page="signup">
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
          autoComplete="new-password webauthn"
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
        {errorMessage && <ErrorMessage error={errorMessage} />}
      </form>
    </LogAndSignLayout>
  );
}

export default SignupForm;
