"use client";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type ContentData = {
  id: string;
  title: string;
  text: string;
  [key: string]: unknown;
};

type Props = {
  contentData: ContentData[];
};

const InfoscreenCarouselClient = ({ contentData }: Props) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {contentData?.map((content) => (
          <CarouselItem
            key={content.id}
            className="rounded-lg bg-amber-300 p-8 flex flex-col items-start justify-center h-full w-full"
          >
            <h1 className="text-4xl font-bold">{content.title}</h1>
            <p>{content.text}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default InfoscreenCarouselClient;
