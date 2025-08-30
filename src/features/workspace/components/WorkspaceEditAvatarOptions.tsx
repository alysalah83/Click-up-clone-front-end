import { useWorkspaceAvatar } from "../contexts/WorkspaceAvatarProvider";
import WorkspaceEditAvatarMenu from "./WorkspaceEditAvatarMenu";

function WorkspaceEditAvatarOptions() {
  const { icon, color, handleSelectColor, handleSelectIcon } =
    useWorkspaceAvatar();

  return (
    <WorkspaceEditAvatarMenu
      currentColor={color}
      currentIcon={icon}
      onSelectColor={handleSelectColor}
      onSelectIcon={handleSelectIcon}
    />
  );
}

export default WorkspaceEditAvatarOptions;
