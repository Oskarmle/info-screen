import { fetchAllContentForInfoScreen } from "@/lib/contentActions";
import InfoscreenCarouselClient from "./InfoscreenCarouselClient";

type InfoscreenCarouselProps = {
  infoscreenId: string;
  colour: string;
  textColour: string;
};

const InfoscreenCarousel = async ({
  infoscreenId,
  colour,
  textColour,
}: InfoscreenCarouselProps) => {
  const content = await fetchAllContentForInfoScreen(infoscreenId);

  return (
    <InfoscreenCarouselClient
      contentData={content.data || []}
      colour={colour}
      textColour={textColour}
    />
  );
};

export default InfoscreenCarousel;
