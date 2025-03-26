"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaSignOutAlt } from "react-icons/fa";
import { NAVIGATION_LINKS } from "@/constants";
import clsx from "clsx";
import { Typography } from "@/constants/typography";
import { AuthService } from "@/services/authService";
import { useRouter } from "next/navigation";
import routes from "@/routes/routes";

export default function Sidebar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(() => {
        if (typeof window === "undefined") return true;
        return JSON.parse(localStorage.getItem("sidebarExpanded") || "true");
    });

    useEffect(() => {
        localStorage.setItem("sidebarExpanded", JSON.stringify(isOpen));
    }, [isOpen]);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            router.push(routes.login);
            router.refresh();
        } catch (error) {
            router.push(routes.login);
            console.error("Logout failed:", error);
        }
    };

    return (
        <div
            className={clsx(
                "bg-gray-800 text-white h-screen transition-all duration-300",
                isOpen ? "w-64 fixed inset-y-0 z-50" : "w-20 relative"
            )}
        >
            <div className="flex flex-col h-full">
                <div
                    className={clsx(
                        "flex items-center h-16 border-b border-gray-700",
                        isOpen ? "px-4" : "px-2"
                    )}
                >
                    {isOpen ? (
                        <>
                            <Link className={Typography.Title} href={routes.home}>LeveSabor</Link>
                            <button
                                onClick={toggleSidebar}
                                className="ml-auto p-2 hover:bg-gray-700 rounded-lg"
                            >
                                <FaChevronLeft className={Typography.Title} />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={toggleSidebar}
                            className="w-full flex items-center justify-center p-2 hover:bg-gray-700 rounded-lg"
                        >
                            <FaChevronRight className={Typography.Title} />
                        </button>
                    )}
                </div>
                <nav className="flex-1 p-2">
                    {NAVIGATION_LINKS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.href} href={item.href} className="block mb-1 last:mb-0">
                                <div
                                    className={clsx(
                                        "flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors",
                                        isOpen ? "justify-start" : "justify-center"
                                    )}
                                >
                                    <Icon className={Typography.Title} />
                                    {isOpen && (
                                        <span className={clsx(Typography.Label, "ml-3")}>
                                            {item.label}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>
                <div className="mt-auto p-2">
                    <button
                        onClick={handleLogout}
                        className={clsx(
                            "flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition-colors hover:cursor-pointer",
                            isOpen ? "justify-start" : "justify-center"
                        )}
                    >
                        <FaSignOutAlt className={Typography.Title} />
                        {isOpen && (
                            <span className={clsx(Typography.Label, "ml-3")}>Logout</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
