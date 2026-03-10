import { fetchOrganizationForOneUser } from "@/lib/organizationActions";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import OrganizationSelectButton from "./OrganizationSelectButton";
import LogOutButton from "./LogOutButton";
import { Separator } from "./ui/separator";

const OrganizationChooseCard = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const organizations = await fetchOrganizationForOneUser(
    session.user?.id || "",
  );

  return (
    <Card className="w-9/12">
      <CardHeader>
        <CardTitle>Choose an organization to continue</CardTitle>
        <CardDescription>
          This is your organizations that you&apos;re a part of.
        </CardDescription>
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex flex-col gap-2 h-150 rounded-lg">
          {organizations?.data?.map((organizations) => (
            <Card key={organizations.organization.id}>
              <div className="flex justify-between items-center pr-4">
                <CardHeader className="w-2/3">
                  <CardTitle>{organizations.organization.name}</CardTitle>
                  <CardDescription>
                    {organizations.organization.street}
                    {", "}
                    {organizations.organization.postalCode}
                  </CardDescription>
                </CardHeader>
                <OrganizationSelectButton
                  organizationId={organizations.organization.id}
                />
              </div>
            </Card>
          ))}
        </CardContent>
      </ScrollArea>
      <CardFooter className="flex flex-col">
        <CardDescription className="flex items-center text-center">
          <span>Don&apos;t have an organization?</span>
          <Button
            variant="link"
            className="py-0 px-1 text-accent-background font-normal cursor-pointer"
          >
            Create one
          </Button>
        </CardDescription>
        <Separator />
        <LogOutButton />
      </CardFooter>
    </Card>
  );
};

export default OrganizationChooseCard;
