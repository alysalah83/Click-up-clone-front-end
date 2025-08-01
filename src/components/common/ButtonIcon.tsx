import {
  hoverElementClasses,
  hoverElementWithBgClasses,
  sizeClasses,
} from "@/constants/styles";
import { ICONS_MAP } from "@/constants/iconsMap";
import React from "react";
import clsx from "clsx";
import type { IconsMap, StylesSizes } from "@/types/index.types";

const iconPaddingClasses = {
  small: "p-1",
  medium: "p-[6px]",
  large: "p-2",
  xLarge: "p-3",
} as const;

type PaddingType = keyof typeof iconPaddingClasses;

interface ButtonIconProps {
  icon: IconsMap;
  iconColor?: string;
  label?: string;
  labelSize?: StylesSizes;
  ariaLabel: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  withBg?: boolean;
  bgColor?: `bg-${string}-${number}/${number}`;
  bgHoverColor?: `hover:bg-${string}-${number}/${number} active:bg-${string}-${number}/${number}`;
  size?: number;
  padding?: PaddingType;
  type?: "default" | "primary" | "bordered";
  isActive?: boolean;
  btnType?: "button" | "submit";
  disabled?: boolean;
  disabledIconColor?: string;
}

function ButtonIcon({
  icon,
  iconColor = "",
  label,
  labelSize = "small",
  ariaLabel,
  withBg = false,
  bgColor,
  bgHoverColor,
  size = 5,
  padding = "medium",
  type = "default",
  isActive = false,
  onClick,
  btnType = "button",
  disabled = false,
  disabledIconColor,
}: ButtonIconProps) {
  if (type === "default" && isActive)
    throw new Error("buttonIcon with default type cannot be active");

  const Icon = ICONS_MAP[icon];

  const buttonClasses = clsx(
    "rounded-lg transition duration-300 disabled:cursor-not-allowed",
    iconPaddingClasses[padding],
    !isActive &&
      !bgHoverColor &&
      !bgColor &&
      (withBg ? hoverElementWithBgClasses : hoverElementClasses),

    {
      "disabled:bg-neutral-700/20": !bgColor && !bgHoverColor,
    },

    bgColor && `${bgColor} cursor-pointer`,
    bgHoverColor && `cursor-pointer`,
    {
      "bg-neutral-800/15 border border-neutral-600": type === "bordered",
      "bg-neutral-50": type === "primary" && isActive,
    },
  );

  const iconClasses = clsx(
    "transition duration-300",
    sizeClasses[size],
    iconColor,
    disabledIconColor,
    type === "default" && !iconColor && "fill-neutral-400 text-neutral-400",
    type === "primary" && isActive && "fill-neutral-950 text-neutral-950",
    type === "primary" && !isActive && "fill-neutral-200 text-neutral-200",
    type === "bordered" && !iconColor && "filled-neutral-400 text-neutral-400",
  );

  const labelClasses = clsx({
    "text-xs font-medium text-neutral-400": labelSize === "small",
    "text-sm font-medium": labelSize === "medium",
    "text-base": labelSize === "large",
  });

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      aria-label={ariaLabel}
      type={btnType}
      disabled={disabled}
    >
      {label ? (
        <span className="flex items-center gap-1.5 px-1">
          <Icon className={iconClasses} />
          <span className={labelClasses}>{label}</span>
        </span>
      ) : (
        <Icon className={iconClasses} />
      )}
    </button>
  );
}

export default ButtonIcon;
