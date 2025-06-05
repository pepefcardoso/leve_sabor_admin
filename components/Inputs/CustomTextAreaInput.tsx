"use client";

import { TextareaHTMLAttributes } from "react";
import clsx from "clsx";
import { Typography } from "@/constants/typography";

interface CustomTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  id?: string;
}

const CustomTextAreaInput: React.FC<CustomTextAreaProps> = ({
  className = "",
  rows = 4,
  disabled,
  label,
  error,
  id,
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
    "focus:border-tertiary focus:ring-2 focus:ring-tertiary",
    { "border-red-500 focus:border-red-500 focus:ring-red-500": error },
    className
  );
  const textareaId = id || props.name || `custom-textarea-${Math.random().toString(36).substring(2, 9)}`;
  const errorId = error ? `${textareaId}-error` : undefined;
  return (
    <div className="space-y-2 w-full">
      {label && <label htmlFor={textareaId} className={clsx(Typography.Subtitle, "block")}>{label}</label>}
      <textarea
        {...props}
        id={textareaId}
        rows={rows}
        disabled={disabled}
        className={baseClasses}
        aria-describedby={errorId}
        aria-invalid={!!error}
      />
      {error && <p id={errorId} className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomTextAreaInput;
