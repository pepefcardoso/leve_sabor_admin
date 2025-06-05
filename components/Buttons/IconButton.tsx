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
    ariaLabel?: string; // NOVO: obrigatório para acessibilidade
    tabIndex?: number;
    dataTestId?: string;
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
    ariaLabel,
    tabIndex,
    dataTestId,
}) => {
    const baseClasses = clsx(
        "inline-flex items-center justify-center p-3 transform",
        "transition-[transform,shadow,opacity] transition-transform duration-200",
        disabled
            ? "cursor-not-allowed opacity-50"
            : "rounded-lg hover:hover:bg-gray-100",
        className
    );
    if (!ariaLabel) {
        // Garante acessibilidade para botões de ícone
        console.warn('IconButton: ariaLabel é obrigatório para acessibilidade.');
    }
    if (href && !disabled) {
        return (
            <Link href={href} onClick={onClick} className={baseClasses} aria-disabled={disabled} role="button" aria-label={ariaLabel} tabIndex={tabIndex} data-testid={dataTestId}>
                <Icon size={size} color={color} aria-hidden={!!ariaLabel ? undefined : true} />
            </Link>
        );
    }
    return (
        <button onClick={onClick} type={type} disabled={disabled} className={baseClasses} aria-label={ariaLabel} tabIndex={tabIndex} data-testid={dataTestId}>
            <Icon size={size} color={color} aria-hidden={!!ariaLabel ? undefined : true} />
        </button>
    );
};

export default IconButton;
