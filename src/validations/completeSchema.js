import {z} from 'zod'

export const nameSchema = z.string().regex(/^[A-Z][a-z]*$/, "Must start with a capital letter");
export const usernameSchema = z.string().regex(/^[a-z0-9_]+$/, "Username must be lowercase, no spaces, only numbers or underscore allowed");