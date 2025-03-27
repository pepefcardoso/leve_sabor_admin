export const metadata = {
  title: "Login - LeveSabor Admin",
  description: "Página de login do LeveSabor",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
