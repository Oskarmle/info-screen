import { auth } from "@/lib/auth";
import DashboardSidebar from "@/src/components/DashboardSidebar";
import NavBar from "@/src/components/NavBar";
import { ThemeProvider } from "@/src/components/providers/ThemeProvider";
import { SidebarProvider } from "@/src/components/ui/sidebar";
import { isLocale, type Locale } from "@/src/i18n/config";
import { notFound } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const session = await auth();

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      suppressHydrationWarning
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <DashboardSidebar locale={locale} />
          <main
            suppressHydrationWarning
            className="flex w-full flex-col mt-4 mb-4 mr-4 bg-background rounded-lg overflow-hidden"
          >
            <NavBar locale={locale} session={session || undefined} />
            <div
              suppressHydrationWarning
              className="flex flex-1 min-h-0 w-full overflow-hidden"
            >
              {children}
            </div>
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
