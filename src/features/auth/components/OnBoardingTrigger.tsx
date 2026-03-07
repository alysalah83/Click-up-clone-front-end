"use client";

import { use, useEffect } from "react";
import { UserWithoutPassword } from "../types";
import Modal, { ModalContent, useModal } from "@/shared/ui/ModalCompound";
import CreateSpaceFlow from "@/features/workspace/components/CreateSpaceFlow";
import { updateUser } from "../actions/update-user.action";

function OnBoardingTrigger({
  userPromise,
}: {
  userPromise: Promise<UserWithoutPassword>;
}) {
  const user = use(userPromise);

  const hasOnBoarded = user.hasOnBoarded;

  if (hasOnBoarded) return;

  return (
    <Modal>
      <Content />
    </Modal>
  );
}

function Content() {
  const { toggleModal } = useModal();

  useEffect(() => {
    toggleModal();
    updateUser({ hasOnBoarded: true });
  }, [toggleModal]);

  return (
    <ModalContent>
      <CreateSpaceFlow />
    </ModalContent>
  );
}

export default OnBoardingTrigger;
