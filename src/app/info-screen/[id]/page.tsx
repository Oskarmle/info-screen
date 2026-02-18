import { fetchInfoScreen } from "@/lib/infoScreenActions";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const infoScreen = await fetchInfoScreen(id);

  console.log("Fetched info screen in page:", infoScreen);

  return (
    <div>
      <h1>{infoScreen.data?.title}</h1>
    </div>
  );
};

export default Page;
