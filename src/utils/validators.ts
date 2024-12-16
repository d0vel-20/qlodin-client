import { z } from "zod";

export const __validators = {
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must be at most 20 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character.")
    .regex(/^\S*$/, "Password cannot contain spaces."),
  otp6: z
    .string()
    .length(6, "OTP must be 6 characters.")
    .regex(/^\d+$/, "OTP must be a number."),
  properName: z
    .string()
    .regex(/^[A-Z]/, "Must start with a capital letter.")
    .regex(/^[^0-9]*$/, "Cannot contain numbers.")
    .regex(/^[A-Za-z\-.]*$/, "Can only contain letters, hyphens, or periods."),
  userName: z
    .string()
    .regex(
      /^[a-z0-9_]+$/,
      "Username must be lowercase, no spaces, only numbers or underscore allowed"
    ),
  phone: z.string().regex(/^\+\d{1,3}\s\d{4,14}$/, "invalid phone number"),
  dateOfBirth: z
    .string()
    .regex(
      /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
      "Date must be in the format dd/mm/yyyy"
    ),
};
