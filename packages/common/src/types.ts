import { z } from "zod";

export const SignupSchema = z.object({
    username: z.string(),
    password: z.string().min(8).max(30).refine((value)=>/[A-Z]/.test(value)).refine((value)=>/[a-z]/.test(value)).refine((value)=>/[\W_]/.test(value))
})

export const SigninSchema = z.object({
    username: z.string(),
    password: z.string().min(8).max(30).refine((value)=>/[A-Z]/.test(value)).refine((value)=>/[a-z]/.test(value)).refine((value)=>/[\W_]/.test(value))
})

export const RoomSchema = z.object({
    name: z.string().min(8).max(30)
})