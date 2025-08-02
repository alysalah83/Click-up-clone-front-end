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
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-700 text-sm font-medium">
        {nameFirstLetters}
      </div>
      <span className="text-base font-medium text-neutral-200 capitalize">
        {name}
      </span>
    </div>
  );
}

export default UserLogo;
