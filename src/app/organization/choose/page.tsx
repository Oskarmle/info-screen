import { auth } from "@/lib/auth";
import { getSelectedOrganization } from "@/lib/organizationActions";
import OrganizationChooseCard from "@/src/components/OrganizationChooseCard";
import { ThemeProvider } from "@/src/components/providers/ThemeProvider";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const savedOrganizationId = await getSelectedOrganization();

  let hasValidMembership = false;
  if (savedOrganizationId) {
    const membership = await prisma.userOrganization.findFirst({
      where: {
        userId: session.user?.id,
        organizationId: savedOrganizationId,
        status: "APPROVED",
      },
    });
    hasValidMembership = !!membership;
  }

  if (savedOrganizationId && hasValidMembership) {
    redirect("/dashboard");
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main
        className="flex items-center justify-center h-screen w-full "
        suppressHydrationWarning
      >
        <OrganizationChooseCard />
      </main>
    </ThemeProvider>
  );
};

export default Page;
