import { auth } from "@/lib/auth";
import { fetchColour } from "@/lib/colourAction";
import { fetchAllInfoScreenForOrganization } from "@/lib/infoScreenActions";
import InfoScreenCard from "@/src/components/InfoScreenCard";
import { Button } from "@/src/components/ui/button";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerLocale } from "@/src/i18n/server";
import { dashboardMessages } from "@/src/i18n/dashboardMessages";
import { withLocalePath } from "@/src/i18n/config";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  const locale = await getServerLocale();
  const t = dashboardMessages[locale].infoScreenSeeAll;

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

  return (
    <div
      className="flex flex-col min-h-0 h-full w-full gap-4 rounded-lg px-4 pb-4"
      suppressHydrationWarning
    >
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <p>{t.description}</p>
      <Link href={withLocalePath(locale, "/dashboard/info-screen/create")} className="w-fit">
        <Button variant="secondary">{t.createButton}</Button>
      </Link>
      <ScrollArea className="flex-1 min-h-0 pr-4 rounded-lg">
        <div className="flex flex-col gap-4 pb-4">
          {infoScreensWithColours.map((infoScreen) => (
            <InfoScreenCard key={infoScreen.id} infoScreen={infoScreen} locale={locale} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Page;
