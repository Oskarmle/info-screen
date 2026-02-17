import { auth } from "./auth";
import { prisma } from "./db/prisma";
import { infoScreenSchema } from "./db/schema";
import { executeAction } from "./executeAction";

export const createInfoScreen = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const session = await auth();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      const title = formData.get("title");
      const description = formData.get("description");
      const organizationId = formData.get("organizationId");
      const colourId = formData.get("colourId");
      const validatedData = infoScreenSchema.parse({
        title,
        description,
        organizationId,
        colourId,
      });

      const membership = await prisma.userOrganization.findFirst({
        where: {
          userId: session.user.id,
          organizationId: validatedData.organizationId,
        },
      });

      if (!membership) throw new Error("Forbidden");

      await prisma.infoScreen.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          organizationId: validatedData.organizationId,
          colourId: validatedData.colourId,
        },
      });
    },
  });
};

export const fetchInfoScreen = async (infoScreenId: string) => {
  return executeAction({
    actionFn: async () => {
      const session = await auth();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      const infoScreen = await prisma.infoScreen.findUnique({
        where: { id: infoScreenId },
      });

      if (!infoScreen) throw new Error("Not found");

      const membership = await prisma.userOrganization.findFirst({
        where: {
          userId: session.user.id,
          organizationId: infoScreen.organizationId,
        },
      });

      if (!membership) throw new Error("Forbidden");

      return infoScreen;
    },
  });
};
