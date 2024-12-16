import { z } from "zod";
import { __validators } from "../utils";

// Zod schema for form validation
export const signupSchema = z
  .object({
    email: __validators.email,
    password: __validators.password,
    confirmPassword: __validators.password,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const loginSchema = z.object({
  email: __validators.email,
  password: __validators.password,
});
