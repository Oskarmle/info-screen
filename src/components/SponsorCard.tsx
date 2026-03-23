"use client";
import { Sponsor } from "@/generated/prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { deleteSponsor } from "@/lib/sponsorActions";

type SponsorCardProps = {
  sponsor: Sponsor;
};

const SponsorCard = ({ sponsor }: SponsorCardProps) => {
  const deleteSponsorHandler = async (id: string) => {
    await deleteSponsor(id);
  };

  return (
    <Card
      key={sponsor.id}
      className="w-100 flex flex-col justify-between gap-4 pt-4 pb-0"
    >
      <CardHeader>
        <CardTitle>{sponsor.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {!sponsor.logo ? (
          <div className="mb-1 flex h-28 w-full items-center justify-center rounded-lg bg-muted">
            No image
          </div>
        ) : (
          <div className="relative h-28 w-full rounded-lg bg-white">
            <Image
              src={sponsor.logo}
              fill
              className="rounded-lg object-contain px-4"
              alt="Sponsor logo"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between bg-accent rounded-b-lg py-4">
        <Button
          variant="destructive"
          onClick={() => deleteSponsorHandler(sponsor.id)}
        >
          Delete sponsor
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SponsorCard;
