import Image from "next/image";
import Button from "../common/Button";
import Modal, { ModalContent, ModalTrigger } from "../ui/ModalCompound";
import CreateWorkspaceForm from "@/features/workspace/components/CreateWorkspaceForm";

function NoWorkspace() {
  return (
    <div className="mx-auto mt-16 flex flex-col items-center gap-6">
      <div className="relative h-48 w-48">
        <Image
          src="https://app-cdn.clickup.com/media/no-cards-home-dark-GMNRR5V2.svg"
          fill
          className="object-fill"
          alt="no workspace image"
        />
      </div>
      <p className="text-center text-base text-neutral-400">
        You have no existing Spaces to put shared tasks in.
        <br /> Create a Space now to organize your work.
      </p>
      <Modal>
        <ModalTrigger>
          <Button type="primary" ariaLabel="create new space button">
            Create new space
          </Button>
        </ModalTrigger>
        <ModalContent contentYPosition="withTopMargin">
          <CreateWorkspaceForm />
        </ModalContent>
      </Modal>
    </div>
  );
}

export default NoWorkspace;
