import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { getSelectedOrganization } from "@/lib/organizationActions";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const selectedOrgId = await getSelectedOrganization();

  if (selectedOrgId) {
    const membership = await prisma.userOrganization.findFirst({
      where: {
        userId: session.user?.id,
        organizationId: selectedOrgId,
        status: "APPROVED",
      },
    });
    if (membership) {
    } else {
      redirect("/organization/choose");
    }
  } else {
    redirect("/organization/choose");
  }

  return (
    <div
      className="flex h-full w-full rounded-b-lg px-4"
      suppressHydrationWarning
    >
      Dashboard
    </div>
  );
};

export default Page;
