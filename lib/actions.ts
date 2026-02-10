import { prisma } from "./db/prisma";
import { schema } from "./db/schema";
import { executeAction } from "./executeAction";

const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const email = formData.get("email");
      const password = formData.get("password");
      const validatedData = schema.parse({ email, password });
      await prisma.user.create({
        data: {
          email: validatedData.email,
          password: validatedData.password,
        },
      });
    },
  });
};

export { signUp };
