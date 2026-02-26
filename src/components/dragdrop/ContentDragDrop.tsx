"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { useState } from "react";
import { Button } from "../ui/button";
import { addContentToInfoScreen } from "@/lib/infoScreenActions";

type Content = {
  id: string;
  name: string;
  title: string;
  text: string;
  image: string | null;
  contactEmail: string | null;
  contactName: string | null;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
};

type ContentDragDropProps = {
  contents: Content[];
  infoScreenId: string;
};

const ContentDragDrop = ({ contents, infoScreenId }: ContentDragDropProps) => {
  const [items, setItems] = useState<{
    "all-content": Content[];
    "active-content": Content[];
  }>({
    "all-content": contents,
    "active-content": [],
  });

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
        onClick={async () =>
          await addContentToInfoScreen(infoScreenId, items["active-content"])
        }
      >
        Save content to infoScreen
      </Button>
    </DragDropProvider>
  );
};

export default ContentDragDrop;
