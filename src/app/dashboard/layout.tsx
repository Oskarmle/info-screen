import DashboardSidebar from "@/src/components/DashboardSidebar";
import NavBar from "@/src/components/NavBar";
import { ThemeProvider } from "@/src/components/providers/ThemeProvider";
import { SidebarProvider } from "@/src/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex" suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider >
          <DashboardSidebar />
          <main className="w-full">
            <NavBar />
            <div className="px-4">{children}</div>
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
