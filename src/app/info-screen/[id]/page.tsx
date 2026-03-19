import { fetchColour } from "@/lib/colourAction";
import { fetchInfoScreen } from "@/lib/infoScreenActions";
import InfoscreenCarousel from "@/src/components/infoscreen/InfoscreenCarousel";
import SponsorBanner from "@/src/components/infoscreen/SponsorBanner";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const infoScreen = await fetchInfoScreen(id);

  const colour = await fetchColour(infoScreen.data?.colourId || "");

  return (
    <div className="w-screen h-screen flex flex-col">
      <div
        className="h-full w-screen p-4 shadow-2xl flex items-center justify-center"
        style={{ backgroundColor: colour.data?.accent || "#ffffff" }}
      >
        <InfoscreenCarousel
          infoscreenId={infoScreen.data?.id || ""}
          colour={colour.data?.oklch || "#ffffff"}
        />
      </div>
      <SponsorBanner />
    </div>
  );
};

export default Page;
