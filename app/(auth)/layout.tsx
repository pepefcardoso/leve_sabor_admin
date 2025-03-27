import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/Sidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <main className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-4 overflow-auto">{children}</div>
      </main>
    </AuthGuard>
  );
}
