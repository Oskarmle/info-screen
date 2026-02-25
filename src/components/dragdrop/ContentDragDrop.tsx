"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { useState } from "react";

type Content = {
  id: string;
  name: string;
  title: string;
  text: string;
  image: string | null;
  contactEmail: string | null;
  contactName: string | null;
  organizationId: string;
};

type ContentDragDropProps = {
  contents: Content[];
};

const ContentDragDrop = ({ contents }: ContentDragDropProps) => {
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
      onDragEnd={() => {
        console.log("Active content:", items["active-content"]);
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
    </DragDropProvider>
  );
};

export default ContentDragDrop;
