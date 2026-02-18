import { fetchColour } from "@/lib/colourAction";
import { fetchAllInfoScreenForOrganization } from "@/lib/infoScreenActions";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { cookies } from "next/headers";
import Link from "next/link";

const Page = async () => {
  const cookieStore = await cookies();
  const selectedOrganizationId = cookieStore.get(
    "selectedOrganizationId",
  )?.value;

  const infoScreens = await fetchAllInfoScreenForOrganization(
    selectedOrganizationId ?? "",
  );

  const infoScreensWithColours = await Promise.all(
    infoScreens.data?.map(async (infoScreen) => {
      const colour = await fetchColour(infoScreen.colourId);
      return { ...infoScreen, colour };
    }) ?? [],
  );

  console.log(infoScreens);
  return (
    <div
      className="flex flex-col min-h-0 h-full w-full gap-4 rounded-lg p-4"
      suppressHydrationWarning
    >
      <h1 className="text-2xl font-bold">This is all the info screens</h1>
      <p>
        This list shows all the info screens that have been created for this
        organization. You can get a link to share the info screen or delete it
        if you no longer need it.
      </p>
      <Link href="/dashboard/info-screen/create" className="w-fit">
        <Button variant="secondary">Create a info screen</Button>
      </Link>
      <ScrollArea className="flex h-full pr-4 rounded-lg">
        <div className="flex flex-col gap-4 mb-12">
          {infoScreensWithColours.map((infoScreen) => (
            <Card key={infoScreen.id} className="pt-4 pb-0">
              <CardHeader>
                <CardTitle>{infoScreen.title}</CardTitle>
                <CardDescription>{infoScreen.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between bg-accent rounded-b-lg py-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="default">Get link</Button>
                  <Button variant="outline">Delete</Button>
                </div>
                <div
                  className="h-9 w-40 rounded-lg border"
                  style={{ backgroundColor: infoScreen.colour.data?.oklch }}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Page;
