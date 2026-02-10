import z from "zod";

const schema = z.object({
  email: z.email().trim().toLowerCase().trim(),
  password: z.string().min(6).max(128),
});

export { schema };
