import { auth } from "./auth";
import { prisma } from "./db/prisma";
import { organizationSchema, userSchema } from "./db/schema";
import { executeAction } from "./executeAction";

export const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const email = formData.get("email");
      const password = formData.get("password");
      const validatedData = userSchema.parse({ email, password });
      await prisma.user.create({
        data: {
          email: validatedData.email,
          password: validatedData.password,
        },
      });
    },
  });
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
