import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import OrganizationCard from "@/src/components/organizationCard";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const memberships = await prisma.userOrganization.findMany({
    include: { organization: true },
  });

  const filteredMemberships = memberships.filter(
    (membership) => membership.userId !== session?.user?.id,
  );

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full gap-4 rounded-lg p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Organization Dashboard</h1>
        <p>
          Create your own organization or choose to request membership in an
          existing one.
        </p>
      </div>
      <div className="flex flex-1 mt-4 min-h-0 w-full">
        <div className="flex justify-around w-full min-h-0 overflow-hidden">
          <Button variant="outline" size="lg">
            <Link href="/dashboard/organization/create-new">
              Create your own organization
            </Link>
          </Button>
          <Separator orientation="vertical" />
          <div className="flex flex-col gap-6 overflow-auto pr-4 rounded-lg">
            {filteredMemberships.map((membership) => (
              <OrganizationCard
                key={membership.organization.id}
                membership={membership}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
