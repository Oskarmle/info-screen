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

type contentCardProps = {
  content: Content;
};

const ContentCard = ({ content }: contentCardProps) => {
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
            No image
          </div>
        ) : (
          <Image src={content.image} className="h-30" alt="Content image" />
        )}
        <Separator />
        {content.contactEmail && content.contactName ? (
          <div className="h-15">
            <p>Contact information</p>
            <p className="text-muted-foreground text-sm">
              {content.contactName}
            </p>
            <p className="text-muted-foreground text-sm">
              {content.contactEmail}
            </p>
          </div>
        ) : (
          <p className="h-15">No contact information added for this content</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between bg-accent rounded-b-lg py-4 border-t">
        <Button variant="destructive">Delete content</Button>
        <Button variant="outline">Edit content</Button>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
