import ButtonIcon from "@/components/common/ButtonIcon";
import RowAddNew from "@/components/common/RowAddNew";
import Modal, {
  ModalContent,
  ModalTrigger,
} from "@/components/ui/ModalCompound";
import CreateWorkspaceForm from "./CreateWorkspaceForm";
import { WORKSPACE_ICONS_SIZE } from "../consts/workspace.consts";
import WorkspacesList from "./WorkspacesList";

function Workspace() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Spaces</h4>
        <Modal>
          <ModalTrigger>
            <ButtonIcon
              icon="plus"
              size={WORKSPACE_ICONS_SIZE}
              ariaLabel="add new space button"
            />
          </ModalTrigger>
          <ModalContent contentYPosition="withTopMargin">
            <CreateWorkspaceForm />
          </ModalContent>
        </Modal>
      </div>
      <WorkspacesList />
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

export default Workspace;
