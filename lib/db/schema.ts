import z from "zod";

const schema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(6).max(128).trim().toLowerCase(),
});

export { schema };
