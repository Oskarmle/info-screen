import { Content } from "@/generated/prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { Separator } from "./ui/separator";
import type { Locale } from "@/src/i18n/config";
import { dashboardMessages } from "@/src/i18n/dashboardMessages";

type contentCardProps = {
  content: Content;
  locale: Locale;
};

const ContentCard = ({ content, locale }: contentCardProps) => {
  const t = dashboardMessages[locale].components.contentCard;

  return (
    <Card
      key={content.id}
      className="w-[32%] flex flex-col justify-between pt-4 pb-0"
    >
      <CardHeader>
        <CardTitle>{content.name}</CardTitle>
        <CardDescription>{content.title}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center gap-2">
        {!content.image ? (
          <div className="w-full h-30 bg-muted rounded-lg flex items-center justify-center mb-1">
            {t.noImage}
          </div>
        ) : (
          <div className="relative w-full h-30">
            <Image
              src={content.image}
              fill
              className="rounded-lg object-cover"
              alt={t.imageAlt}
            />
          </div>
        )}
        <Separator />
        {content.contactEmail && content.contactName ? (
          <div className="h-15">
            <p>{t.contactInfo}</p>
            <p className="text-muted-foreground text-sm">
              {content.contactName}
            </p>
            <p className="text-muted-foreground text-sm">
              {content.contactEmail}
            </p>
          </div>
        ) : (
          <p className="h-15">{t.noContactInfo}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between bg-accent rounded-b-lg py-4 border-t">
        <Button variant="destructive">{t.deleteButton}</Button>
        <Button variant="outline">{t.editButton}</Button>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
