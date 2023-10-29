"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-60 transition w-full rounded-lg flex items-center justify-center gap-2
      ${
        outline
          ? "bh-white border-rose-500 text-rose-500"
          : "bg-rose-500 border-rose-500 text-white"
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
    </button>
  );
};

export default Button;
