"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import PageSkeleton from "./Skeletons/PageSkeleton";

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const token = useAuthStore((state) => state.token);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (pathname !== "/login" && !token) {
            router.push("/login");
        }
    }, [pathname, token, router]);

    if (pathname !== "/login" && !token) {
        return PageSkeleton();
    }

    return <>{children}</>;
};

export default AuthGuard;
