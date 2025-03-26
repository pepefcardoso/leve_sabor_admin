"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import PageSkeleton from "./Skeletons/PageSkeleton";
import routes from "@/routes/routes";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, setAuthenticated } = useAuthStore();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const controller = new AbortController();

        const checkAuth = async () => {
            try {
                const response = await fetch("/api/auth/check", {
                    signal: controller.signal,
                });

                if (!response.ok) throw new Error("Auth check failed");

                const { isAuthenticated: authStatus } = await response.json();
                setAuthenticated(authStatus);

                // Redirecionamentos
                if (authStatus && pathname === "/login") {
                    router.replace("/");
                } else if (!authStatus && pathname !== "/login") {
                    router.replace(routes.login);
                }
            } catch (error) {
                if (!(error instanceof DOMException)) {
                    setAuthenticated(false);
                    router.replace(routes.login);
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
        return () => controller.abort();
    }, [pathname, router, setAuthenticated]);

    if (loading) {
        return <PageSkeleton />;
    }

    if ((isAuthenticated && pathname === "/login") || (!isAuthenticated && pathname !== "/login")) {
        return null;
    }

    return <>{children}</>;
};

export default AuthGuard;