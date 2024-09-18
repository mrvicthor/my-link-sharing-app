import { z } from "zod";

const emailSchema = z
  .string({ message: "Can't be empty" })
  .email({ message: "Invalid email" });

const passwordSchema = z.string().min(8, { message: "Please check again" });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(8, { message: "Please check again" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verificationSchema = z.string().min(1).max(24);
