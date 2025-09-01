import Button from "@/components/common/Button";
import { ICONS_MAP } from "@/constants/iconsMap";
import Link from "next/link";
import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
};

function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-900">
      <div className="flex max-w-96 flex-col items-center gap-4 rounded-xl bg-neutral-800 px-6 py-8">
        <div className="mb-4 w-fit rounded-xl bg-indigo-600/20 p-2 ring-2 ring-indigo-600 ring-offset-4 ring-offset-neutral-800">
          <ICONS_MAP.setting className="size-8 fill-indigo-600 text-indigo-600" />
        </div>

        <h2 className="text-xl font-semibold text-neutral-200">
          This page is unavailable
        </h2>
        <p className="text-center text-base font-medium text-neutral-400">
          You don&apos;t have access to this Workspace or it doesn&apos;t exist
          anymore.
        </p>
        <Link href="/home/overview" className="w-full">
          <Button
            stretch={true}
            type="colored"
            size="large"
            ariaLabel="go to overview page"
          >
            Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
