import { fetchAllContentForOrganization } from "@/lib/contentActions";
import { fetchInfoScreen } from "@/lib/infoScreenActions";
import ContentDragDrop from "@/src/components/dragdrop/ContentDragDrop";
import EditInfoScreen from "@/src/components/EditInfoScreen";
import { Separator } from "@/src/components/ui/separator";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const infoScreen = await fetchInfoScreen(id);

  if (!infoScreen.data) return <div>Info screen not found</div>;

  const contents = await fetchAllContentForOrganization(
    infoScreen.data?.organizationId || "",
  );

  return (
    <div
      className="flex flex-col min-h-0 h-full w-full gap-4 rounded-lg p-4"
      suppressHydrationWarning
    >
      <h1 className="text-2xl font-bold">Edit your info screen</h1>
      <ContentDragDrop
        infoScreenId={infoScreen.data?.id || ""}
        contents={contents?.data || []}
      />
      <Separator />
      <EditInfoScreen infoScreen={infoScreen?.data} />
    </div>
  );
};

export default Page;
