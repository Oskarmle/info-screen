import { fetchAllContentForInfoScreen } from "@/lib/contentActions";
import InfoscreenCarouselClient from "./InfoscreenCarouselClient";

type InfoscreenCarouselProps = {
  infoscreenId: string;
  colour: string;
};

const InfoscreenCarousel = async ({
  infoscreenId,
  colour,
}: InfoscreenCarouselProps) => {
  const content = await fetchAllContentForInfoScreen(infoscreenId);

  return (
    <InfoscreenCarouselClient
      contentData={content.data || []}
      colour={colour}
    />
  );
};

export default InfoscreenCarousel;
