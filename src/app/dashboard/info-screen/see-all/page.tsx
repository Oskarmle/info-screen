import { fetchColour } from "@/lib/colourAction";
import { fetchAllInfoScreenForOrganization } from "@/lib/infoScreenActions";
import InfoScreenCard from "@/src/components/InfoScreenCard";
import { Button } from "@/src/components/ui/button";
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
      const colourResult = await fetchColour(infoScreen.colourId);
      return { ...infoScreen, colour: colourResult.data ?? null };
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
      <ScrollArea className="flex-1 min-h-0 pr-4 rounded-lg">
        <div className="flex flex-col gap-4 pb-4">
          {infoScreensWithColours.map((infoScreen) => (
            <InfoScreenCard key={infoScreen.id} infoScreen={infoScreen} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Page;
