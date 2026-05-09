import Sidebar from "@/components/Sidebar";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if user is authenticated
  let isAuthenticated = false;
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    isAuthenticated = !!user;
  } catch {
    isAuthenticated = false;
  }

  // If not authenticated, redirect to login
  // This is a backup to the middleware
  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground font-sans">
      <Sidebar />
      <main className="flex-1 min-h-screen ml-64 px-10 py-2">
        {children}
      </main>
    </div>
  );
}
