import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"

export const instant = false

export default async function OwnerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const owner = await prisma.owner.findUnique({ where: { id } })

  if (!owner) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        {owner.firstName} {owner.lastName}
      </h1>
      <dl className="grid w-full max-w-sm grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
        <dt className="text-muted-foreground">Address</dt>
        <dd>{owner.address}</dd>
        <dt className="text-muted-foreground">City</dt>
        <dd>{owner.city}</dd>
        <dt className="text-muted-foreground">Telephone</dt>
        <dd>{owner.telephone}</dd>
      </dl>
    </main>
  )
}
