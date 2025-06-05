"use client";

import React, { useState, useRef, useEffect } from "react";
import { Typography } from "@/constants/typography";
import { txtColors } from "@/constants/colors";
import clsx from "clsx";

interface Option {
    id: string | number;
    label: string;
}

interface CustomCheckboxInputProps {
    options: Option[];
    selected: (string | number)[];
    onChange: (selected: (string | number)[]) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    label?: string;
    error?: string;
    id?: string;
}

const CustomCheckboxInput: React.FC<CustomCheckboxInputProps> = ({
    options,
    selected,
    onChange,
    placeholder = "Selecione opções",
    disabled = false,
    className = "",
    label,
    error,
    id,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleChange = (optionId: string | number, isChecked: boolean) => {
        const newSelected = isChecked
            ? [...selected, optionId]
            : selected.filter((id) => id !== optionId);
        onChange(newSelected);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabels = options
        .filter((option) => selected.includes(option.id))
        .map((option) => option.label)
        .join(", ");

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
            "opacity-50 cursor-not-allowed": disabled,
            "hover:border-tertiary cursor-pointer": !disabled
        },
        className
    );

    const optionClasses = clsx(
        "flex items-center gap-3 p-2",
        "hover:bg-yellow-50 transition-all duration-150 ease-in-out",
        Typography.Caption,
        { "opacity-50 cursor-not-allowed": disabled }
    );

    const groupId = id || `custom-checkbox-group-${Math.random().toString(36).substring(2, 9)}`;
    const errorId = error ? `${groupId}-error` : undefined;

    return (
        <div className="space-y-3 w-full relative" ref={containerRef}> {/* Changed from space-y-2 to space-y-3 */}
            {label && <label className={clsx(Typography.Subtitle, "block mb-1")}>{label}</label>} {/* Added mb-1 */}

            <div
                className={triggerClasses}
                onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
            >
                <span className={clsx(Typography.Helper, txtColors.gray700)}>
                    {selectedLabels || placeholder}
                </span>
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
                    {options.map((option) => {
                        const isSelected = selected.includes(option.id);
                        return (
                            <label key={option.id} className={optionClasses}>
                                <input
                                    type="checkbox"
                                    value={option.id}
                                    checked={isSelected}
                                    onChange={(e) => handleChange(option.id, e.target.checked)}
                                    className="h-4 w-4 text-tertiary focus:ring-tertiary"
                                    disabled={disabled}
                                />
                                {option.label}
                            </label>
                        );
                    })}
                </div>
            )}
            {error && <p id={errorId} className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default CustomCheckboxInput;