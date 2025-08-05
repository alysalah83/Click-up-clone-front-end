import { FEATURES } from "../consts/board";
import { memo } from "react";
import BoardPriorityBtn from "./BoardPriorityBtn";
import BoardDateBtn from "./BoardDateBtn";
import { IconsMap } from "@/types/index.types";

interface FeatureButtonProps {
  feature: { icon: IconsMap; label: string };
}

function BoardTaskFeatureBar() {
  const features = FEATURES;

  return (
    <>
      {features.map((feature) => (
        <FeatureButtonIcon
          feature={feature}
          key={`featureButton-${feature.label}`}
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

export default memo(BoardTaskFeatureBar);
