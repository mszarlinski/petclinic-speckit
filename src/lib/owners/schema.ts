import { z } from "zod"

export const ownerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(30, "First name must be 30 characters or fewer"),
  lastName: z.string().trim().min(1, "Last name is required").max(30, "Last name must be 30 characters or fewer"),
  address: z.string().trim().min(1, "Address is required").max(255, "Address must be 255 characters or fewer"),
  city: z.string().trim().min(1, "City is required").max(80, "City must be 80 characters or fewer"),
  telephone: z
    .string()
    .trim()
    .min(1, "Telephone is required")
    .regex(/^[0-9]{10}$/, "Telephone must contain exactly 10 digits"),
})

export type OwnerInput = z.infer<typeof ownerSchema>

export type OwnerFieldErrors = Partial<Record<keyof OwnerInput, string[]>>

export function toOwnerFieldErrors(error: z.ZodError<OwnerInput>): OwnerFieldErrors {
  return error.flatten().fieldErrors as OwnerFieldErrors
}
