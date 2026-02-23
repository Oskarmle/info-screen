import z from "zod";

export const userSchema = z.object({
  email: z.email().trim().toLowerCase().trim(),
  password: z.string().min(6).max(128),
});

export const organizationSchema = z.object({
  name: z.string().min(2).max(100),
  street: z.string(),
  postalCode: z.coerce.number().int().positive(),
  city: z.string(),
  cvrNumber: z.preprocess((cvrNumber) => {
    if (typeof cvrNumber === "string" && cvrNumber === "") {
      return undefined;
    } else {
      return cvrNumber;
    }
  }, z.string().length(8).optional()),
  logo: z.preprocess((logo) => {
    if (typeof logo === "string" && logo === "") {
      return undefined;
    } else {
      return logo;
    }
  }, z.string().optional()),
});

export const infoScreenSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string(),
  organizationId: z.string(),
  colourId: z.string(),
});

export const contentSchema = z.object({
  name: z.string().min(2).max(100),
  title: z.string().min(2).max(100),
  text: z.string(),
  image: z.preprocess((image) => {
    if (image instanceof File && image.size > 0) {
      return image;
    } else {
      return undefined;
    }
  }, z.instanceof(File).optional()),
  contactEmail: z.preprocess((email) => {
    if (typeof email === "string" && email === "") {
      return undefined;
    }
    return email;
  }, z.string().optional()),
  contactName: z.preprocess((name) => {
    if (typeof name === "string" && name === "") {
      return undefined;
    }
    return name;
  }, z.string().optional()),
  organizationId: z.string(),
});
