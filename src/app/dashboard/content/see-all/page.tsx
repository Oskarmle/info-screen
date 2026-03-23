import { auth } from "@/lib/auth";
import { fetchAllContentForOrganization } from "@/lib/contentActions";
import ContentCard from "@/src/components/ContentCard";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerLocale } from "@/src/i18n/server";
import { dashboardMessages } from "@/src/i18n/dashboardMessages";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  const locale = await getServerLocale();
  const t = dashboardMessages[locale].contentSeeAll;

  const cookieStore = await cookies();
  const selectedOrganizationId = cookieStore.get(
    "selectedOrganizationId",
  )?.value;

  const content = (
    await fetchAllContentForOrganization(selectedOrganizationId ?? "")
  ).data;

  return (
    <div
      className="flex flex-col min-h-0 h-full w-full gap-4 rounded-lg px-4 pb-4"
      suppressHydrationWarning
    >
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <p>{t.description}</p>
      <ScrollArea className="flex-1 flex-col min-h-0 gap-4 pr-4 rounded-lg">
        <div className="flex flex-wrap pb-4 justify-start gap-4">
          {content?.map((content) => (
            <ContentCard key={content.id} content={content} locale={locale} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Page;
