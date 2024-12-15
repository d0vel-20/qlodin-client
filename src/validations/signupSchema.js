import { z } from 'zod';

// Zod schema for form validation
export const signupSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(20, "Password must be at most 20 characters.")
      .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter.")
        .refine((val) => /[a-z]/.test(val), "Password must contain at least one lowercase letter.")
        .refine((val) => /[0-9]/.test(val), "Password must contain at least one number.")
        .refine((val) => /[@$!%*?&]/.test(val), "Password must contain at least one special character.")
        .refine((val) => !/\s/.test(val), "Password cannot contain spaces."),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(20, "Password must be at most 20 characters."),
  }).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });
