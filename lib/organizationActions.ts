"use server";

import { cookies } from "next/headers";
import { auth } from "./auth";
import { prisma } from "./db/prisma";
import { organizationSchema } from "./db/schema";
import { executeAction } from "./executeAction";

export const setSelectedOrganization = async (organizationId: string) => {
  const cookieStore = await cookies();
  cookieStore.set("selectedOrganizationId", organizationId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
};

export const getSelectedOrganization = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("selectedOrganizationId")?.value ?? null;
};

export const createOrganization = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const session = await auth();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      const name = formData.get("name");
      const street = formData.get("street");
      const postalCode = formData.get("postalCode");
      const city = formData.get("city");
      const cvrNumber = formData.get("cvrNumber");
      const logo = formData.get("logo");
      const validatedData = organizationSchema.parse({
        name,
        street,
        postalCode,
        city,
        cvrNumber,
        logo,
      });
      await prisma.organization.create({
        data: {
          name: validatedData.name,
          street: validatedData.street,
          postalCode: validatedData.postalCode,
          city: validatedData.city,
          cvrNumber: validatedData.cvrNumber,
          logo: validatedData.logo,
          userOrganizations: {
            create: {
              userId: session.user.id,
              isAdmin: true,
            },
          },
        },
      });
    },
  });
};

export const fetchOrganization = async (organizationId: string) => {
  return executeAction({
    actionFn: async () => {
      const session = await auth();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      const organization = await prisma.organization.findUnique({
        where: { id: organizationId },
      });

      console.log("Fetched organization in action:", organization);

      return organization;
    },
  });
};
