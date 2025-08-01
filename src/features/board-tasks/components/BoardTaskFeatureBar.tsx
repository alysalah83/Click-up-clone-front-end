import ButtonIcon from "@/components/common/ButtonIcon";
import { hoverElementClasses } from "@/constants/styles";
import { BOARD_TASK_ICON_SIZE, FEATURES } from "../consts/board";
import { memo } from "react";
import BoardPriorityBtn from "./BoardPriorityBtn";
import BoardDateBtn from "./BoardDateBtn";
import { IconsMap } from "@/types/index.types";

interface BoardTaskFeatureBarProps {
  shape: "buttonIcon" | "buttonIconWithLabel";
}

interface FeatureButtonProps {
  feature: { icon: IconsMap; label: string };
}

function BoardTaskFeatureBar({ shape }: BoardTaskFeatureBarProps) {
  const features = FEATURES;

  return (
    <>
      {shape === "buttonIcon"
        ? features.map((feature) => (
            <FeatureButtonIcon
              feature={feature}
              key={`featureButton-${feature.label}`}
            />
          ))
        : features.map((feature) => (
            <FeatureButtonRow
              feature={feature}
              key={`featureButtonWithLabel-${feature.label}`}
            />
          ))}
    </>
  );
}

function FeatureButtonIcon({ feature }: FeatureButtonProps) {
  const { icon, label } = feature;
  const labelWithOutAdd = label.replace("Add ", "");
  const newLabel = `${labelWithOutAdd[0].toUpperCase()}${labelWithOutAdd.slice(1)}`;

  if (newLabel === "Priority")
    return <BoardPriorityBtn icon={icon} label={newLabel} />;
  else if (newLabel === "Date")
    return <BoardDateBtn icon={icon} label={newLabel} />;
}

function FeatureButtonRow({ feature }: FeatureButtonProps) {
  const { icon, label } = feature;

  return (
    <div
      className={`flex items-center gap-1 rounded-lg p-1 ${hoverElementClasses}`}
      onClick={(e) => e.stopPropagation()}
    >
      <ButtonIcon
        icon={icon}
        ariaLabel={`${label} button`}
        size={BOARD_TASK_ICON_SIZE}
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export default memo(BoardTaskFeatureBar);
