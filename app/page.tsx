"use client";
import { NAVIGATION_LINKS } from "@/constants";
import { Typography } from "@/constants/typography";
import clsx from "clsx";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {NAVIGATION_LINKS.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link key={index} href={item.href}>
              <div className={clsx("bg-tertiary shadow-md", "flex flex-col items-center justify-center p-6 rounded-lg", "hover:opacity-90 hover:shadow-lg transition-transform duration-200")}>
                <Icon size={48} color="black" className="mb-2" />
                <span className={clsx(Typography.Headline)}>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
