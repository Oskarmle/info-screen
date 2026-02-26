import { auth } from "./auth";
import { prisma } from "./db/prisma";
import { contentSchema } from "./db/schema";
import { executeAction } from "./executeAction";

export const createContent = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const session = await auth();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      const name = formData.get("name");
      const title = formData.get("title");
      const text = formData.get("text");
      const image = formData.get("image");
      const contactEmail = formData.get("contactEmail");
      const contactName = formData.get("contactName");
      const organizationId = formData.get("organizationId");
      const validatedData = contentSchema.parse({
        name,
        title,
        text,
        image,
        contactEmail,
        contactName,
        organizationId,
      });

      const membership = await prisma.userOrganization.findFirst({
        where: {
          userId: session.user.id,
          organizationId: validatedData.organizationId,
        },
      });

      if (!membership) throw new Error("Forbidden");

      await prisma.content.create({
        data: {
          name: validatedData.name,
          title: validatedData.title,
          text: validatedData.text,
          image: validatedData.image
            ? (validatedData.image as File).name
            : null,
          contactEmail: validatedData.contactEmail,
          contactName: validatedData.contactName,
          organizationId: validatedData.organizationId,
        },
      });
    },
  });
};

export const fetchAllContentForOrganization = async (
  organizationId: string,
) => {
  return executeAction({
    actionFn: async () => {
      const session = await auth();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      const membership = await prisma.userOrganization.findFirst({
        where: {
          userId: session.user.id,
          organizationId: organizationId,
        },
      });

      if (!membership) throw new Error("Forbidden");

      const contents = await prisma.content.findMany({
        where: { organizationId },
        include: { infoScreens: true },
      });

      return contents;
    },
  });
};

export const fetchAllContentForInfoScreen = async (infoScreenId: string) => {
  return executeAction({
    actionFn: async () => {
      const infoScreen = await prisma.infoScreen.findUnique({
        where: { id: infoScreenId },
      });

      if (!infoScreen) throw new Error("Info screen not found");

      const contents = await prisma.content.findMany({
        where: {
          organizationId: infoScreen.organizationId,
          infoScreens: {
            some: { id: infoScreenId },
          },
          include: { infoScreens: true }
        },
      });

      return contents;
    },
  });
};
