import { fetchInfoScreen } from "@/lib/infoScreenActions";

const Page = async ({ params }: { params: { id: string } }) => {
  const infoScreen = await fetchInfoScreen(params.id);

  console.log("Fetched info screen in page:", infoScreen);

  return (
    <div>
      <h1>{infoScreen.data?.title}</h1>
    </div>
  );
};

export default Page;
