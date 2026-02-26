"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { useState } from "react";
import { Button } from "../ui/button";
import { addContentToInfoScreen } from "@/lib/infoScreenActions";
import { Prisma } from "@/generated/prisma/client";
import { toast } from "sonner";
import Droppable2 from "./Droppable2";

type ContentWithInfoScreens = Prisma.ContentGetPayload<{
  include: { infoScreens: true };
}>;

type ContentDragDropProps = {
  contents: ContentWithInfoScreens[];
  infoScreenId: string;
};

const ContentDragDrop = ({ contents, infoScreenId }: ContentDragDropProps) => {
  const [items, setItems] = useState<{
    "all-content": ContentWithInfoScreens[];
    "active-content": ContentWithInfoScreens[];
  }>({
    "all-content": contents.filter(
      (content) =>
        !content.infoScreens.some((screen) => screen.id === infoScreenId),
    ),
    "active-content": contents.filter((content) =>
      content.infoScreens.some((screen) => screen.id === infoScreenId),
    ),
  });

  const handleAddContent = async () => {
    try {
      await addContentToInfoScreen(infoScreenId, items["active-content"]);
      toast.success("Content is saved to info screen", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(`Something went wrong, ${error}`, {
        position: "bottom-right",
      });
    }
  };

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setItems((items) => move(items, event));
      }}
    >
      <div className="flex flex-row gap-4 justify-between">
        <Droppable2 id="all-content" listName="All content">
          {items["all-content"].map((content, index) => (
            <Draggable
              column="all-content"
              id={content.id}
              index={index}
              name={content.name}
              title={content.title}
              text={content.text}
              key={content.id}
              image={content.image}
            />
          ))}
        </Droppable2>
        <Droppable id="active-content" listName="Active content">
          {items["active-content"].map((content, index) => (
            <Draggable
              column="active-content"
              id={content.id}
              index={index}
              name={content.name}
              title={content.title}
              text={content.text}
              key={content.id}
              image={content.image}
            />
          ))}
        </Droppable>
      </div>
      <Button
        className="w-1/2"
        type="submit"
        onClick={async () => {
          await handleAddContent();
        }}
      >
        Save content to infoScreen
      </Button>
    </DragDropProvider>
  );
};

export default ContentDragDrop;
