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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { Locale } from "@/src/i18n/config";
import { withLocalePath } from "@/src/i18n/config";
import { dashboardMessages } from "@/src/i18n/dashboardMessages";

type InfoScreenCardProps = {
  locale: Locale;
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

const InfoScreenCard = ({ infoScreen, locale }: InfoScreenCardProps) => {
  const router = useRouter();
  const t = dashboardMessages[locale].components.infoScreenCard;

  const deleteInfoScreenHandler = async (id: string) => {
    await deleteInfoScreen(id);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t.copiedToast, {
        position: "bottom-right",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditInfoScreen = () => {
    router.push(withLocalePath(locale, `/dashboard/info-screen/edit/${infoScreen.id}`));
  };

  return (
    <Card key={infoScreen.id} className="pt-4 pb-0">
      <CardHeader>
        <CardTitle>{infoScreen.title}</CardTitle>
        <CardDescription>{infoScreen.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* FIXME: correct links when deployed */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <p className="text-sm">{t.linkLabel}</p>
            <p className="text-sm">
              http://localhost:3000/info-screen/{infoScreen.id}
            </p>
          </div>
          <div
            className="flex justify-center items-center h-9 rounded-lg border text-sm"
            style={{ backgroundColor: infoScreen.colour?.oklch }}
          >
            {t.colourLabel}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-accent rounded-b-lg py-4 border-t">
        <div className="flex items-center gap-2">
          <a
            href={`http://localhost:3000/info-screen/${infoScreen.id}`}
            target="_blank"
          >
            <Button variant="default">{t.openButton}</Button>
          </a>
          <Button
            variant="outline"
            onClick={() =>
              copyToClipboard(
                `http://localhost:3000/info-screen/${infoScreen.id}`,
              )
            }
          >
            {t.copyButton}
          </Button>
          <Button variant="outline" onClick={handleEditInfoScreen}>
            {t.editButton}
          </Button>
        </div>
        <Button
          variant="destructive"
          onClick={() => deleteInfoScreenHandler(infoScreen.id)}
        >
          {t.deleteButton}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InfoScreenCard;
