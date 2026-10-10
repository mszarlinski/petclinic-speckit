"use server"

import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ownerSchema, toOwnerFieldErrors, type OwnerFieldErrors } from "@/lib/owners/schema"

export type CreateOwnerState =
  | { status: "idle" }
  | { status: "error"; fieldErrors: OwnerFieldErrors }

export async function createOwner(
  _prevState: CreateOwnerState,
  formData: FormData
): Promise<CreateOwnerState> {
  const parsed = ownerSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    address: formData.get("address"),
    city: formData.get("city"),
    telephone: formData.get("telephone"),
  })

  if (!parsed.success) {
    return { status: "error", fieldErrors: toOwnerFieldErrors(parsed.error) }
  }

  const owner = await prisma.owner.create({ data: parsed.data })

  redirect(`/owners/${owner.id}`)
}
