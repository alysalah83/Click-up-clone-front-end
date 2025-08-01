import Image from "next/image";
import { ReactNode } from "react";
import Button from "@/components/common/Button";
import Link from "next/link";
import bg from "../../../../public/bg.png";

function LogAndSignLayout({
  children,
  page,
}: {
  children: ReactNode;
  page: "login" | "signup";
}) {
  const isLoginPage = page === "login";
  return (
    <div className="relative flex h-screen w-full items-center justify-center text-gray-700">
      <Image
        src={bg}
        fill
        alt="background image"
        className="-z-10 object-cover"
        priority
        placeholder="blur"
        quality={100}
      />
      <div className="fixed top-7 right-7 flex items-center gap-5">
        <span className="font-bold text-gray-800">
          {isLoginPage ? "Don't have an account?" : "Already have account?"}
        </span>
        <Link href={`/${isLoginPage ? "signup" : "login"}`}>
          <Button
            size="large"
            type="colored"
            buttonFor="button"
            ariaLabel="sign up button"
            extraClasses="shadow-lg shadow-indigo-600/60"
          >
            {isLoginPage ? "sign up" : "login"}
          </Button>
        </Link>
      </div>
      <section className="min-w-80 rounded-lg bg-white px-12 py-8 shadow-2xl shadow-black/30 sm:min-w-md">
        <h1 className="mb-8 border-b border-gray-200 pb-4 text-center text-3xl font-bold tracking-wide">
          {isLoginPage ? "Welcome back!" : "Seconds to sign up!"}
        </h1>
        {children}
      </section>
    </div>
  );
}

export default LogAndSignLayout;
