import ButtonIcon from "./ButtonIcon";
import { hoverElementClasses } from "@/constants/styles";

interface RowAddNewProps {
  label: string;
  onClick?: () => void;
}

function RowAddNew({ label, onClick }: RowAddNewProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-2 py-1 opacity-60 transition duration-300 ${hoverElementClasses}`}
      onClick={onClick}
    >
      <ButtonIcon icon="plus" size={4} ariaLabel="add new space button" />
      <h4 className="text-sm font-medium">{label}</h4>
    </div>
  );
}

export default RowAddNew;
