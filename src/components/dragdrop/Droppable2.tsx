import { useDroppable } from "@dnd-kit/react";
import { ReactNode } from "react";

interface DroppableProps {
  id: string;
  children?: ReactNode;
  listName: string;
}

const Droppable2 = ({ id, children, listName }: DroppableProps) => {
  const { ref } = useDroppable({
    id,
    type: "column",
    accept: ["item"],
  });
  return (
    <div
      ref={ref}
      className="h-80 w-1/3 bg-accent rounded-lg flex flex-col gap-2 p-2"
    >
      <h1 className="text-lg font-bold pb-2 shrink-0">{listName}</h1>
      <div className="flex flex-col w-full gap-2 overflow-auto rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default Droppable2;
