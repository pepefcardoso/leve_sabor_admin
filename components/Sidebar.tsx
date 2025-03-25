"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SIDEBAR_LINKS } from "@/constants";
import clsx from "clsx";
import { Typography } from "@/constants/typography";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("sidebarExpanded");
            return saved ? JSON.parse(saved) : true;
        }
        return true;
    });

    useEffect(() => {
        localStorage.setItem("sidebarExpanded", JSON.stringify(isOpen));
    }, [isOpen]);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className={clsx("bg-gray-800 text-white h-screen transition-all duration-300", isOpen ? "w-64" : "w-20")}>
            <div className="flex flex-col h-full">
                <div className={clsx("flex items-center h-16 border-b border-gray-700", isOpen ? "px-4" : "px-2")}>
                    {isOpen ? (
                        <>
                            <span className={Typography.Title}>LeveSabor</span>
                            <button
                                onClick={toggleSidebar}
                                className="ml-auto p-2 hover:bg-gray-700 rounded-full"
                            >
                                <FaChevronLeft className={Typography.Title} />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={toggleSidebar}
                            className="w-full flex items-center justify-center p-2 hover:bg-gray-700 rounded-full"
                        >
                            <FaChevronRight className={Typography.Title} />
                        </button>
                    )}
                </div>
                <nav className="flex-1 p-2">
                    {SIDEBAR_LINKS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.href} href={item.href} className="block mb-1 last:mb-0">
                                <div className={clsx("flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors", isOpen ? "justify-start" : "justify-center")}>
                                    <Icon className={Typography.Title} />
                                    {isOpen && <span className={clsx(Typography.Label, "ml-3")}>{item.title}</span>}
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
