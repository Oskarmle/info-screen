import { fetchAllContentForInfoScreen } from "@/lib/contentActions";
import InfoscreenCarouselClient from "./InfoscreenCarouselClient";

type InfoscreenCarouselProps = {
  infoscreenId: string;
};

const InfoscreenCarousel = async ({
  infoscreenId,
}: InfoscreenCarouselProps) => {
  const content = await fetchAllContentForInfoScreen(infoscreenId);

  return (
    <InfoscreenCarouselClient contentData={content.data || []} />
  );
};

export default InfoscreenCarousel;
