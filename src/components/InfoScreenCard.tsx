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
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-sm">The link to the info screen is:</p>
            <p className="text-sm">
              http://localhost:3000/info-screen/{infoScreen.id}
            </p>
          </div>
          <div
            className="flex justify-center items-center h-9 rounded-lg border text-sm"
            style={{ backgroundColor: infoScreen.colour?.oklch }}
          >
            The color of the info-screen
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-accent rounded-b-lg py-4 border-t">
        <div className="flex items-center gap-2">
          <a
            href={`http://localhost:3000/info-screen/${infoScreen.id}`}
            target="_blank"
          >
            <Button variant="default">Go to info-screen</Button>
          </a>
          <Button
            variant="outline"
            onClick={() =>
              copyToClipboard(
                `http://localhost:3000/info-screen/${infoScreen.id}`,
              )
            }
          >
            Copy link
          </Button>
        </div>
        <Button
          variant="destructive"
          onClick={() => deleteInfoScreenHandler(infoScreen.id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InfoScreenCard;
