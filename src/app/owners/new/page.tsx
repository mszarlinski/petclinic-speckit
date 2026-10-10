import { OwnerForm } from "./owner-form"

export default function NewOwnerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Register an owner</h1>
      <OwnerForm />
    </main>
  )
}
