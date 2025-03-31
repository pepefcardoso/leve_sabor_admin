"use client";

import { iconColors, IconColorType } from "@/constants/colors";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";

interface IconButtonProps {
    Icon?: IconType;
    color?: IconColorType;
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
    size?: number;
    type?: "button" | "submit" | "reset";
    className?: string;
}

const IconButton: FC<IconButtonProps> = ({
    Icon = FiArrowRight,
    color = iconColors.black,
    onClick,
    href,
    disabled = false,
    size = 20,
    type = "button",
    className = "",
}) => {
    const baseClasses = clsx(
        "inline-flex items-center justify-center p-3 transform",
        "transition-[transform,shadow,opacity] transition-transform duration-200",
        disabled
            ? "cursor-not-allowed opacity-50"
            : "rounded-lg hover:hover:bg-gray-100",
        className
    );


    if (href && !disabled) {
        return (
            <Link href={href} onClick={onClick} className={baseClasses} aria-disabled={disabled} role="button">
                <Icon size={size} color={color} />
            </Link>
        );
    }

    return (
        <button onClick={onClick} type={type} disabled={disabled} className={baseClasses}>
            <Icon size={size} color={color} />
        </button>
    );
};

export default IconButton;
