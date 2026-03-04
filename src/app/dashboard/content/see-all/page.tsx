import { fetchAllContentForOrganization } from "@/lib/contentActions";
import ContentCard from "@/src/components/ContentCard";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { cookies } from "next/headers";

const Page = async () => {
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
      <h1 className="text-2xl font-bold">This is all the info screens</h1>
      <p>
        This list shows all the content that have been created for this
        organization. You can&apos;t delete that is active on an info screen,
        but you can delete content that is not active on any info screen.
      </p>
      <ScrollArea className="flex-1 flex-col min-h-0 gap-4 pr-4 rounded-lg">
        <div className="flex flex-wrap pb-4 justify-start gap-4">
          {content?.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Page;
