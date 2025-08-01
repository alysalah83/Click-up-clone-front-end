"use client";

import Button from "@/components/common/Button";
import LogAndSignLayout from "./LogAndSignLayout";
import FormInputWithLabel from "@/components/common/FormInputWithLabel";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/common/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/features/auth/validations/authSchemas";
import { loginUser } from "../actions/auth.actions.ts";

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
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async function (data: FormData) {
    setIsPending(true);
    const error = await loginUser({
      email: data.email,
      password: data.password,
    });
    if (typeof error === "string") setErrorMessage(error);
    setIsPending(false);
  };

  return (
    <LogAndSignLayout page="login">
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
        {errorMessage && <ErrorMessage error={errorMessage} />}
      </form>
    </LogAndSignLayout>
  );
}

export default LoginForm;
