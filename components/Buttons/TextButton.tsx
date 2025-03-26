"use client";

import Link from "next/link";
import { FC } from "react";
import clsx from "clsx";
import { txtColors, TxtColorType } from "@/constants/colors";
import { Typography, TypographyType } from "@/constants/typography";

interface TextButtonProps {
  text: string;
  fontColor?: TxtColorType;
  typography?: TypographyType;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const TextButton: FC<TextButtonProps> = ({
  text,
  fontColor = txtColors.gray700,
  typography = Typography.Button,
  href,
  onClick,
  type = "button",
  disabled = false,
  className,
}) => {
  const baseClasses = clsx(
    "rounded-lg px-4 py-2 flex items-center justify-center transform",
    "transition-[transform,shadow,opacity] transition-transform duration-200",
    typography,
    fontColor,
    disabled
      ? "cursor-not-allowed opacity-50"
      : "hover:hover:bg-gray-100",
    className
  );

  const content = <span>{text}</span>;

  if (href && !disabled) {
    return (
      <Link href={href} onClick={onClick} className={baseClasses} aria-disabled={disabled} role="button">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses} disabled={disabled} type={type} aria-disabled={disabled}>
      {content}
    </button>
  );
};

export default TextButton;
