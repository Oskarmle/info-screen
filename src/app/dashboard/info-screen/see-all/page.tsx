import { fetchColour } from "@/lib/colourAction";
import { fetchAllInfoScreenForOrganization } from "@/lib/infoScreenActions";
import { cookies } from "next/headers";

const Page = async () => {
    const cookieStore = await cookies();
    const selectedOrganizationId = cookieStore.get(
      "selectedOrganizationId",
    )?.value;

  const infoScreens = await fetchAllInfoScreenForOrganization(selectedOrganizationId ?? "");

  infoScreens.data?.forEach(async (infoScreen) => {
    const colour = await fetchColour(infoScreen.colourId);
    console.log(colour);
  })

  console.log(infoScreens);
  return (
    <div
      className="flex flex-col min-h-0 w-full gap-4 rounded-lg p-4"
      suppressHydrationWarning
    >
      Page
    </div>
  );
};

export default Page;
