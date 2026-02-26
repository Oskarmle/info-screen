import { fetchAllContentForOrganization } from "@/lib/contentActions";
import { fetchInfoScreen } from "@/lib/infoScreenActions";
import ContentDragDrop from "@/src/components/dragdrop/ContentDragDrop";
import { Separator } from "@/src/components/ui/separator";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const infoScreen = await fetchInfoScreen(id);

  const contents = await fetchAllContentForOrganization(
    infoScreen.data?.organizationId || "",
  );

  return (
    <div
      className="flex flex-col min-h-0 h-full w-full gap-4 rounded-lg p-4"
      suppressHydrationWarning
    >
      <h1 className="text-2xl font-bold">Edit your info screen</h1>
      <p>
        Here you can change the title, description, color and more. You can also
        add content to your info screen
      </p>
      <Separator />
      <div className="flex flex-col gap-1">
        <h1 className="text-xl">{infoScreen.data?.title}</h1>
        <p>{infoScreen.data?.description}</p>
      </div>
      <ContentDragDrop
        infoScreenId={infoScreen.data?.id || ""}
        contents={contents?.data || []}
      />
    </div>
  );
};

export default Page;
