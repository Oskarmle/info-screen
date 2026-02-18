import { prisma } from "./db/prisma";
import { executeAction } from "./executeAction";

export const fetchColours = async () => {
  return executeAction({
    actionFn: async () => {
      return prisma.colour.findMany();
    },
  });
};