import './globals.css'
import { Inter } from "next/font/google";
import clsx from "clsx";
import { Metadata } from "next";
import { bgColors } from '@/constants/colors';

export const metadata: Metadata = {
  title: 'LeveSabor Admin',
  description: 'Administração do LeveSabor',
}

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
        <main>
          <div className="mx-auto h-full">{children}</div>
        </main>
      </body>
    </html>
  );
}
