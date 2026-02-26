import ButtonIcon from "@/shared/ui/Button/ButtonIcon";
import RowAddNew from "@/shared/components/RowAddNew";
import Modal, { ModalContent, ModalTrigger } from "@/shared/ui/ModalCompound";
import CreateWorkspaceForm from "./CreateWorkspaceForm";
import { ICONS_SIZE } from "../consts/workspace.consts";
import SpacesList from "./SpacesList";

function SpacesSection() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Spaces</h4>
        <Modal>
          <ModalTrigger>
            <ButtonIcon
              icon="plus"
              size={ICONS_SIZE}
              ariaLabel="add new space button"
            />
          </ModalTrigger>
          <ModalContent contentYPosition="withTopMargin">
            <CreateWorkspaceForm />
          </ModalContent>
        </Modal>
      </div>
      <SpacesList />
      <Modal>
        <ModalTrigger>
          <RowAddNew label="New Space" />
        </ModalTrigger>
        <ModalContent contentYPosition="withTopMargin">
          <CreateWorkspaceForm />
        </ModalContent>
      </Modal>
    </>
  );
}

export default SpacesSection;
