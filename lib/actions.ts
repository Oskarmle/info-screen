import { prisma } from "./db/prisma";
import { userSchema } from "./db/schema";
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
