"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createOwner, type CreateOwnerState } from "./actions"

const initialState: CreateOwnerState = { status: "idle" }

const FIELDS = [
  { name: "firstName", label: "First name" },
  { name: "lastName", label: "Last name" },
  { name: "address", label: "Address" },
  { name: "city", label: "City" },
  { name: "telephone", label: "Telephone" },
] as const

export function OwnerForm() {
  const [state, formAction, pending] = useActionState(createOwner, initialState)
  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
      {FIELDS.map(({ name, label }) => {
        const errors = fieldErrors?.[name]
        const errorId = `${name}-error`
        return (
          <div key={name} className="flex flex-col gap-1.5">
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              name={name}
              aria-invalid={errors ? true : undefined}
              aria-describedby={errors ? errorId : undefined}
            />
            {errors?.map((message) => (
              <p key={message} id={errorId} role="alert" className="text-sm text-destructive">
                {message}
              </p>
            ))}
          </div>
        )
      })}
      <Button type="submit" disabled={pending}>
        Register owner
      </Button>
    </form>
  )
}
