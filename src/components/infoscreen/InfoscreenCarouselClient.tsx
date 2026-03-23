"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Content } from "@/generated/prisma/client";
import Image from "next/image";
import { Progress } from "../ui/progress";
import { useCallback, useEffect, useState } from "react";

type Props = {
  contentData: Content[];
  colour: string;
};

const InfoscreenCarouselClient = ({ contentData, colour }: Props) => {
  const delay = 20000; // 20 seconds
  const [progress, setProgress] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const startProgress = useCallback(() => {
    setProgress(0);
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const next = Math.min((elapsed / delay) * 100, 100);
      setProgress(next);

      if (next >= 100) clearInterval(interval);
    }, 50);

    return interval;
  }, [delay]);

  useEffect(() => {
    if (!api) return;

    let interval = startProgress();

    api.on("select", () => {
      clearInterval(interval);
      interval = startProgress();
    });

    return () => clearInterval(interval);
  }, [api, startProgress]);

  return (
    <Carousel
      setApi={setApi}
      className="w-full h-full"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: delay,
        }),
        Fade(),
      ]}
    >
      <CarouselContent className="h-full flex">
        {contentData?.map((content) => (
          <CarouselItem key={content.id}>
            <div
              className="rounded-lg flex justify-between flex-col h-full p-8 max-w-500"
              style={{ backgroundColor: colour || "#ffffff" }}
            >
              <div className="flex flex-col gap-4 flex-1 min-h-0">
                <h1 className="text-8xl font-bold shrink-0">{content.title}</h1>
                <p className="text-4xl shrink-0 mb-4">{content.text}</p>
                {content.image && (
                  <div className="relative flex-1 w-250">
                    <Image
                      alt="Content image for the info screen"
                      src={content.image}
                      fill
                      sizes="100vw"
                      className="object-cover rounded-lg shadow-xl border-accent"
                    />
                  </div>
                )}
              </div>
              {content.contactEmail && content.contactName && (
                <p className="text-lg mb-2 mt-4">
                  For more information, contact {content.contactName} on{" "}
                  {content.contactEmail}
                </p>
              )}
              <Progress value={progress} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default InfoscreenCarouselClient;
