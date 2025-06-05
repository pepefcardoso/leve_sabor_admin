"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import PageSkeleton from "./Skeletons/PageSkeleton";
import routes from "@/routes/routes";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, setAuthenticated, lastChecked, setLastChecked, sessionExpired, setSessionExpired } = useAuthStore();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        let ignore = false;
        const now = Date.now();
        // Cache válido por 2 minutos
        const cacheValid = lastChecked && (now - lastChecked < 2 * 60 * 1000);
        if (cacheValid) {
            setLoading(false);
            return;
        }
        setLoading(true);
        const controller = new AbortController();
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/auth/check", {
                    signal: controller.signal,
                });
                if (!response.ok) throw new Error("Auth check failed");
                const { isAuthenticated: authStatus } = await response.json();
                setAuthenticated(authStatus);
                setLastChecked(now);
                setSessionExpired(false);
                if (authStatus && pathname === "/login") {
                    router.replace("/");
                } else if (!authStatus && pathname !== "/login") {
                    setSessionExpired(true);
                    router.replace(routes.login);
                }
            } catch (error) {
                if (!(error instanceof DOMException)) {
                    setAuthenticated(false);
                    setSessionExpired(true);
                    router.replace(routes.login);
                }
            } finally {
                if (!ignore) setLoading(false);
            }
        };
        checkAuth();
        return () => {
            ignore = true;
            controller.abort();
        };
    }, [pathname, router, setAuthenticated, setLastChecked, lastChecked, setSessionExpired]);

    // Exibe skeleton apenas se não autenticado e não há cache
    if (loading) {
        return <PageSkeleton />;
    }
    // Feedback de sessão expirada
    if (sessionExpired) {
        return <div className="flex flex-col items-center justify-center h-screen text-red-600 font-bold">Sessão expirada. Faça login novamente.</div>;
    }
    if ((isAuthenticated && pathname === "/login") || (!isAuthenticated && pathname !== "/login")) {
        return null;
    }
    return <>{children}</>;
};

export default AuthGuard;