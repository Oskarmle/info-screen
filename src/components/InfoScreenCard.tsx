"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { deleteInfoScreen } from "@/lib/infoScreenActions";

type InfoScreenCardProps = {
  infoScreen: {
    id: string;
    title: string;
    description: string;
    organizationId: string;
    colourId: string;
    createdAt: Date;
    updatedAt: Date;
    colour: {
      id: string;
      name: string;
      oklch: string;
    } | null;
  };
};

const InfoScreenCard = ({ infoScreen }: InfoScreenCardProps) => {
  const deleteInfoScreenHandler = async (id: string) => {
    await deleteInfoScreen(id);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card key={infoScreen.id} className="pt-4 pb-0">
      <CardHeader>
        <CardTitle>{infoScreen.title}</CardTitle>
        <CardDescription>{infoScreen.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* FIXME: correct links when deployed */}
        <p className="text-sm">The link to the info screen is:</p>
        <p className="text-sm">http://localhost:3000/info-screen/{infoScreen.id}</p>
      </CardContent>
      <CardFooter className="flex justify-between bg-accent rounded-b-lg py-4 border-t">
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            onClick={() => copyToClipboard(`http://localhost:3000/info-screen/${infoScreen.id}`)}
          >
            Copy link
          </Button>
          <Button
            variant="outline"
            onClick={() => deleteInfoScreenHandler(infoScreen.id)}
          >
            Delete
          </Button>
        </div>
        <div
          className="h-9 w-40 rounded-lg border"
          style={{ backgroundColor: infoScreen.colour?.oklch }}
        />
      </CardFooter>
    </Card>
  );
};

export default InfoScreenCard;
