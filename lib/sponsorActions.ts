"use server";
import { UTApi } from "uploadthing/server";
import { auth } from "./auth";
import { prisma } from "./db/prisma";
import { executeAction } from "./executeAction";
import { sponsorSchema } from "./db/schema";
import { revalidatePath } from "next/cache";

const utapi = new UTApi();

export const createSponsor = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const session = await auth();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      const name = formData.get("name");
      const image = formData.get("image") as File | null;
      const organizationId = formData.get("organizationId");
      const validatedData = sponsorSchema.parse({
        name,
        image,
        organizationId,
      });

      const membership = await prisma.userOrganization.findFirst({
        where: {
          userId: session.user.id,
          organizationId: validatedData.organizationId,
        },
      });

      if (!membership) throw new Error("Forbidden");

      let logoUrl: string | null = null;
      if (validatedData.image && validatedData.image.size > 0) {
        const uploadResponse = await utapi.uploadFiles(validatedData.image);
        if (uploadResponse.error) {
          throw new Error("Failed to upload image");
        }
        logoUrl = uploadResponse.data.ufsUrl;
      }

      await prisma.sponsor.create({
        data: {
          name: validatedData.name,
          logo: logoUrl,
          organizationId: validatedData.organizationId,
        },
      });

      revalidatePath("/dashboard/sponsor/create");
    },
  });
};

export const fetchAllSponsorsForOrganization = async (
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

      const sponsors = await prisma.sponsor.findMany({
        where: { organizationId },
      });

      return sponsors;
    },
  });
};

export const deleteSponsor = async (sponsorId: string) => {
  return executeAction({
    actionFn: async () => {
      const session = await auth();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      await prisma.sponsor.delete({
        where: { id: sponsorId },
      });

      revalidatePath("/dashboard/sponsor/create");
    },
  });
};
