import { fetchColour } from "@/lib/colourAction";
import { fetchAllInfoScreenForOrganization } from "@/lib/infoScreenActions";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { cookies } from "next/headers";

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
      <ScrollArea className="flex h-full pr-4 rounded-lg">
        <div className="flex flex-col gap-4 mb-12">
          {infoScreensWithColours.map((infoScreen) => (
            <Card key={infoScreen.id}>
              <CardHeader>
                <CardTitle>{infoScreen.title}</CardTitle>
                <CardDescription>{infoScreen.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="h-10 rounded-lg border"
                  style={{ backgroundColor: infoScreen.colour.data?.oklch }}
                />
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="default">Get link</Button>
                <Button variant="outline">Delete</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Page;
