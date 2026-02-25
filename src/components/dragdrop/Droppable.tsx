import { useDroppable } from "@dnd-kit/react";
import { ReactNode } from "react";

interface DroppableProps {
  id: string;
  children?: ReactNode;
  listName: string;
}

const Droppable = ({ id, children, listName }: DroppableProps) => {
  const { ref } = useDroppable({
    id,
    type: "column",
    accept: ["item"],
  });
  return (
    <div ref={ref} className="h-60 bg-accent rounded-lg flex flex-col p-2">
      <h1 className="text-lg font-bold pb-2 shrink-0">{listName}</h1>
      <div className="flex flex-row gap-2 flex-1 min-h-0 overflow-auto rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default Droppable;
