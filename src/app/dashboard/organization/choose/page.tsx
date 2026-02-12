import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { createOrganization } from "@/lib/organizationActions";
import OrganizationCard from "@/src/components/organizationCard";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Separator } from "@/src/components/ui/separator";
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
    <div
      className="flex flex-col flex-1 min-h-0 w-full gap-4 rounded-lg p-4"
      suppressHydrationWarning
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Organization Dashboard</h1>
        <p>
          Create your own organization or choose to request membership in an
          existing one.
        </p>
      </div>
      <div className="flex flex-1 mt-4 min-h-0 w-full">
        <div className="flex justify-around w-full min-h-0 overflow-hidden">
          <form
            className="w-1/2 gap-4 flex flex-col rounded-lg"
            action={async (formData: FormData) => {
              "use server";
              const res = await createOrganization(formData);
              if (res.success) {
                redirect("/dashboard");
              }
            }}
          >
            <Input
              name="name"
              placeholder="Organization Name"
              type="text"
              required
              autoComplete="organization"
            />
            <Input
              name="street"
              placeholder="Street"
              type="text"
              required
              autoComplete="street-address"
            />
            <Input
              name="postalCode"
              placeholder="Postal Code"
              type="number"
              required
              autoComplete="postal-code"
            />
            <Input
              name="city"
              placeholder="City"
              type="text"
              required
              autoComplete="address-level2"
            />
            <Input
              name="cvrNumber"
              placeholder="CVR Number"
              type="text"
              autoComplete="organization"
            />
            <Input
              name="logo"
              placeholder="Logo URL"
              type="text"
              autoComplete="logo"
            />
            <Button className="w-full" type="submit">
              Create Organization
            </Button>
          </form>
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
