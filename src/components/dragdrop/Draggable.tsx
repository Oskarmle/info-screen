import { useSortable } from "@dnd-kit/react/sortable";

import Image from "next/image";

type DraggableProps = {
  name: string;
  title: string;
  text: string;
  image?: string | null;
  index: number;
  id: string;
  column: string;
};

const Draggable = ({
  name,
  title,
  text,
  image,
  index,
  id,
  column,
}: DraggableProps) => {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });
  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      className="flex flex-col p-4 bg-background rounded-lg cursor-pointer w-60 h-full overflow-hidden shrink-0"
    >
      <h1 className="text-foreground">{name}</h1>
      <p className="text-foreground">{title}</p>
      <p className="text-foreground line-clamp-2">{text}</p>
      {image && <Image src={image} alt={name} className="mt-2 rounded" />}
    </div>
  );
};

export default Draggable;
