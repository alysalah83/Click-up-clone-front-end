import { use } from "react";
import { ClientUser } from "../types/auth.types";

function UserLogo({
  userPromise,
}: {
  userPromise: Promise<ClientUser | undefined>;
}) {
  const user = use(userPromise);
  if (!user) return null;
  const { name } = user;
  const nameFirstLetters = name
    .split(" ")
    .map((name) => name[0].toUpperCase())
    .join("");
  return (
    <div className="flex cursor-default items-center gap-2 rounded-lg px-2 py-1">
      <div className="flex h-6 w-6 items-center justify-center truncate rounded-full bg-lime-300 text-xs font-medium sm:h-8 sm:w-8 sm:text-sm dark:bg-lime-700">
        {nameFirstLetters}
      </div>
      <span className="truncate text-sm font-medium text-neutral-800 capitalize sm:text-base dark:text-neutral-200">
        {name}
      </span>
    </div>
  );
}

export default UserLogo;
