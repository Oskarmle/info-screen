import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const memberships = await prisma.userOrganization.findMany({
    where: { userId: session?.user?.id },
    include: { organization: true },
  });

  if (memberships.length === 0) redirect("/dashboard/organization");

  return (
    <div className="flex h-full w-full bg-amber-800 rounded-b-lg">
      Dashboard
    </div>
  );
};

export default Page;
