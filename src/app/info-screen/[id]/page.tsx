import { fetchAllContentForInfoScreen } from "@/lib/contentActions";
import { fetchInfoScreen } from "@/lib/infoScreenActions";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const infoScreen = await fetchInfoScreen(id);

  const content = await fetchAllContentForInfoScreen(id);

  console.log(content);

  return (
    <div>
      <h1>{infoScreen.data?.title}</h1>
    </div>
  );
};

export default Page;
