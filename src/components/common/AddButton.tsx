import {
  ToolTip,
  ToolTipMessage,
  ToolTipTrigger,
} from "@/components/ui/ToolTipCompound ";
import ButtonIcon from "./ButtonIcon";

interface AddButtonProps {
  toolTipMessage: string;
  ariaLabel: string;
  onClick?: () => void;
}

function AddButton({ toolTipMessage, ariaLabel, onClick }: AddButtonProps) {
  return (
    <ToolTip>
      <ToolTipMessage>{toolTipMessage}</ToolTipMessage>
      <ToolTipTrigger>
        <ButtonIcon
          icon="plus"
          onClick={onClick}
          size={3}
          ariaLabel={ariaLabel}
        />
      </ToolTipTrigger>
    </ToolTip>
  );
}

export default AddButton;
