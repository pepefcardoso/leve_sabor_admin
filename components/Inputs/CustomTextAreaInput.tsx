"use client";

import { TextareaHTMLAttributes } from "react";
import clsx from "clsx";
import { Typography } from "@/constants/typography";

interface CustomTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const CustomTextAreaInput: React.FC<CustomTextAreaProps> = ({
  className = "",
  rows = 4,
  disabled,
  label,
  ...props
}) => {
  const baseClasses = clsx(
    "w-full",
    "border border-gray-400 rounded-md bg-white",
    "px-4 py-3",
    "shadow-md",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "transition-all duration-200",
    "outline-none",
    "resize-y",
    "focus:border-tertiary focus:ring-2 focus:ring-tertiary"
  );

  return (
    <div className="space-y-2 w-full">
      {label && <label className={clsx(Typography.Subtitle, "block")}>{label}</label>}
      <textarea {...props} rows={rows} disabled={disabled} className={clsx(baseClasses, className)} />
    </div>
  );
};

export default CustomTextAreaInput;
