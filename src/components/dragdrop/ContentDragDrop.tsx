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
      <Droppable id="all-content" listName="All content">
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
      </Droppable>
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
