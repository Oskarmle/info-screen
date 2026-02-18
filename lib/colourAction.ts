import { prisma } from "./db/prisma";
import { executeAction } from "./executeAction";

export const fetchColours = async () => {
  return executeAction({
    actionFn: async () => {
      return prisma.colour.findMany();
    },
  });
};

export const fetchColour = async (colourId: string) => {
  return executeAction({
    actionFn: async () => {
      const colour = await prisma.colour.findUnique({
        where: { id: colourId },
      });
      return colour;
    },
  });
};
