import { fetchColour } from "@/lib/colourAction";
import { fetchInfoScreen } from "@/lib/infoScreenActions";
import InfoscreenCarousel from "@/src/components/infoscreen/InfoscreenCarousel";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const infoScreen = await fetchInfoScreen(id);

  const colour = await fetchColour(infoScreen.data?.colourId || "");

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="h-full w-screen p-4 shadow-2xl">
        <InfoscreenCarousel
          infoscreenId={infoScreen.data?.id || ""}
          colour={colour.data?.oklch || "#ffffff"}
        />
      </div>
      <div className="w-full bg-accent border-t h-32 flex items-center justify-center">
        <h1>Sponsor banner</h1>
      </div>
    </div>
  );
};

export default Page;
