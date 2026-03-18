import { fetchInfoScreen } from "@/lib/infoScreenActions";
import InfoscreenCarousel from "@/src/components/infoscreen/InfoscreenCarousel";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const infoScreen = await fetchInfoScreen(id);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="h-full w-screen">
        <InfoscreenCarousel infoscreenId={infoScreen.data?.id || ""} />
      </div>
      <div className="w-full bg-amber-700 h-32 flex items-center justify-center">
        <h1>Sponsor banner</h1>
      </div>
    </div>
  );
};

export default Page;
