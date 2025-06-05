"use client";

import React, { useState, useRef, useEffect } from "react";
import { Typography } from "@/constants/typography";
import { txtColors } from "@/constants/colors";
import clsx from "clsx";

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectInputProps {
  options: Option[];
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  name?: string;
  className?: string;
  required?: boolean;
  label?: string;
  error?: string;
  id?: string;
}

const CustomInputSelect: React.FC<CustomSelectInputProps> = ({
  options,
  value,
  onChange,
  placeholder = "Selecione uma opção",
  disabled = false,
  isLoading = false,
  className = "",
  label,
  error,
  id,
  name,
  ...props
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (optionValue: string | number) => {
    const event = {
      target: { value: optionValue },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(event);
    setIsDropdownOpen(false);
  };

  const selectId = id || name || `custom-select-${Math.random().toString(36).substring(2, 9)}`;
  const errorId = error ? `${selectId}-error` : undefined;
  const baseClasses = clsx(
    "w-full",
    "border border-gray-400 rounded-md",
    "px-4 py-3",
    "bg-white shadow-md",
    "transition-all duration-150 ease-in-out",
    "outline-none",
    "focus:border-tertiary focus:ring-2 focus:ring-tertiary",
    { "border-red-500 focus:border-red-500 focus:ring-red-500": error },
    { "opacity-50 cursor-not-allowed": disabled || isLoading },
    className
  );

  const triggerClasses = clsx(
    "w-full",
    "border border-gray-400 rounded-md",
    "px-4 py-3",
    "flex justify-between items-center",
    "bg-white shadow-md",
    "transition-all duration-150 ease-in-out",
    "outline-none",
    "focus:border-tertiary focus:ring-2 focus:ring-tertiary",
    {
      "opacity-50 cursor-not-allowed": disabled || isLoading,
      "hover:border-tertiary cursor-pointer": !disabled && !isLoading
    },
    className
  );

  const optionClasses = clsx(
    "p-2 cursor-pointer hover:bg-yellow-50",
    "transition-all duration-150 ease-in-out",
    Typography.Caption
  );

  return (
    <div className="space-y-2 w-full" ref={containerRef}>
      {label && <label htmlFor={selectId} className={clsx(Typography.Subtitle, "block")}>{label}</label>}

      <div
        className={triggerClasses}
        onClick={() => !disabled && !isLoading && setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className={clsx(Typography.Helper, txtColors.gray700)}>{displayValue}</span>
        <svg
          className="w-4 h-4 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={clsx(optionClasses, { "bg-yellow-50": option.value === value })}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled || isLoading}
        className={baseClasses}
        aria-describedby={errorId}
        aria-invalid={!!error}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error && <p id={errorId} className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomInputSelect;