import SignupGuestBtn from "@/features/auth/components/SignupGuestBtn";
import { Button } from "@/shared/ui/Button";
import Link from "next/link";

function page() {
  return (
    <div className="relative h-dvh w-dvw overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 -z-10 h-auto min-h-full w-auto min-w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-amber-800 to-black object-cover"
      >
        <source src="/bgVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 z-10 bg-black/40" />
      <div className="absolute top-1/2 left-1/2 z-20 flex -translate-1/2 flex-col gap-4 tracking-wide">
        <h1 className="text-center text-5xl font-bold text-neutral-100 md:text-7xl">
          Mange your workspaces all in one.
        </h1>
        <p className="mb-4 text-center text-lg font-medium text-neutral-300 sm:text-xl">
          All your work in one place: Workspace, List, Task, Goals, & more
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/signup">
            <Button type="colored" size="large" ariaLabel="sign up button">
              Sign In
            </Button>
          </Link>
          <SignupGuestBtn />
        </div>
      </div>
    </div>
  );
}

export default page;
