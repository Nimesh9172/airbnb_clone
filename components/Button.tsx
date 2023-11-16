"use client";

import { IconType } from "react-icons";
import Spinner from "./Spinner";

interface ButtonProps {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  borderColor?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  borderColor = "border-rose-500",
  textColor = "text-rose-500",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-60 transition w-full rounded-lg flex items-center justify-center gap-2
      ${
        outline
          ? `bh-white ${borderColor} ${textColor}`
          : `bg-rose-500  ${borderColor} text-white`
      }
      ${
        small
          ? "py-1 text-sm font-light border-[1px]"
          : "py-3 text-lg font-semibold border-2"
      }
    `}
    >
      {Icon && <Icon size={24} />}
      {label}
      {!outline && disabled && <Spinner />}
    </button>
  );
};

export default Button;
