import { prisma } from "./db/prisma";
import { createUserSchema } from "./db/schema";
import { executeAction } from "./executeAction";

export const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const email = formData.get("email");
      const password = formData.get("password");
      const name = formData.get("name");
      const validatedData = createUserSchema.parse({ email, password, name });
      await prisma.user.create({
        data: {
          email: validatedData.email,
          password: validatedData.password,
          name: validatedData.name,
        },
      });
    },
  });
};
