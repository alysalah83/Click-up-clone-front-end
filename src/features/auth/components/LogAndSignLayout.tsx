import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/Button";

function LogAndSignLayout({
  children,
  page,
}: {
  children: ReactNode;
  page: "login" | "signup";
}) {
  const isLoginPage = page === "login";
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden">
      <div className="hidden flex-col justify-between bg-linear-to-br from-indigo-600 via-violet-600 to-purple-700 p-12 lg:flex lg:w-[45%]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -top-10 -left-10 h-60 w-60 rounded-full border border-white/7" />
          <div className="absolute bottom-20 left-32 h-40 w-40 rounded-full border border-white/10" />
          <div className="absolute -right-16 -bottom-16 h-72 w-72 rounded-full border border-white/6" />
          <div className="absolute top-1/2 right-10 h-24 w-24 rounded-full bg-white/5" />
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white">Click Up</h2>
          <p className="mt-2 text-lg font-medium text-indigo-100/70">
            Manage everything in one place
          </p>
        </div>

        <div className="relative z-10">
          <blockquote className="border-l-2 border-white/30 pl-5">
            <p className="text-lg leading-relaxed text-white/90 italic">
              &ldquo;The best way to predict the future is to create it.&rdquo;
            </p>
            <footer className="mt-3 text-sm font-semibold text-indigo-200/70">
              — Peter Drucker
            </footer>
          </blockquote>
        </div>

        <div className="relative z-10 flex gap-6 text-xs font-medium text-indigo-200/50">
          <span>© 2026 Click Up</span>
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center bg-gray-50 px-6 lg:w-[55%]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="absolute top-7 right-7 z-10 flex items-center gap-4">
          <span className="text-sm font-medium text-gray-500">
            {isLoginPage
              ? "Don\u0027t have an account?"
              : "Already have account?"}
          </span>
          <Link href={`/${isLoginPage ? "signup" : "login"}`}>
            <Button
              size="large"
              type="colored"
              buttonFor="button"
              ariaLabel="sign up button"
              extraClasses="shadow-lg shadow-indigo-500/30"
            >
              {isLoginPage ? "sign up" : "login"}
            </Button>
          </Link>
        </div>

        <section className="relative z-10 w-full max-w-md rounded-2xl border border-gray-100 bg-white px-10 py-10 shadow-xl shadow-gray-200/60">
          <h1 className="mb-8 border-b border-gray-100 pb-4 text-center text-3xl font-bold tracking-wide text-gray-800">
            {isLoginPage ? "Welcome back!" : "Seconds to sign up!"}
          </h1>
          {children}
        </section>
      </div>
    </div>
  );
}

export default LogAndSignLayout;
