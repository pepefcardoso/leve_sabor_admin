"use client";

import { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { Typography } from "@/constants/typography";

export const enum InputType {
  Text = "text",
  Email = "email",
  Tel = "tel",
  Password = "password",
  Number = "number",
  Date = "date",
}

interface CustomTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: InputType;
  label?: string;
  error?: string; // Nova prop para mensagem de erro
}

const CustomTextInput = ({ type = InputType.Text, disabled, label, className, error, ...props }: CustomTextInputProps) => {
  const baseClasses = clsx(
    "w-full",
    "border border-gray-400 rounded-md bg-white",
    "px-4 py-3",
    "shadow-md",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "transition-all duration-200",
    "outline-none",
    "focus:border-tertiary focus:ring-2 focus:ring-tertiary",
    { "border-red-500 focus:border-red-500 focus:ring-red-500": error }, // Estilo de erro
    className
  );

  // Adicionar um ID para o input para o aria-describedby
  const inputId = props.id || `custom-text-input-${props.name || Math.random().toString(36).substring(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="space-y-2 w-full">
      {label && <label htmlFor={inputId} className={clsx(Typography.Subtitle, "block")}>{label}</label>}
      <input {...props} id={inputId} type={type} disabled={disabled} className={baseClasses.trim()} aria-describedby={errorId} aria-invalid={!!error} />
      {error && <p id={errorId} className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomTextInput;
