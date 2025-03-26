import "./globals.css";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { Metadata } from "next";
import { bgColors } from "@/constants/colors";
import Sidebar from "@/components/Sidebar";
import HydrationZustand from "@/store/hydrationZustand";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "LeveSabor Admin",
  description: "Administração do LeveSabor",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={clsx(
          inter.variable,
          bgColors.background,
          "flex flex-col min-h-screen"
        )}
      >
        <HydrationZustand>
          <AuthGuard>
            <main className="flex h-screen">
              <Sidebar />
              <div className="flex-1 p-4 overflow-auto">{children}</div>
            </main>
          </AuthGuard>
        </HydrationZustand>
      </body>
    </html>
  );
}
