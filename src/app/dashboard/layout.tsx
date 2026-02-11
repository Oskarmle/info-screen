import { auth } from "@/lib/auth";
import DashboardSidebar from "@/src/components/DashboardSidebar";
import NavBar from "@/src/components/NavBar";
import { ThemeProvider } from "@/src/components/providers/ThemeProvider";
import { SidebarProvider } from "@/src/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex h-screen w-full overflow-hidden" suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <DashboardSidebar />
          <main className="flex w-full flex-col mt-4 mb-4 mr-4 bg-background rounded-lg overflow-hidden">
            <NavBar session={session || undefined} />
            <div className="flex flex-1 min-h-0 w-full overflow-hidden">{children}</div>
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
