import { PawPrint } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-muted px-4 py-16">
      <main className="flex max-w-md flex-col items-center gap-4 rounded-lg border border-border bg-card p-10 text-center shadow-sm">
        <PawPrint className="size-10 text-primary" aria-hidden />
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Petclinic
        </h1>
        <p className="text-base text-muted-foreground">
          Spec-driven clinic management, scaffolded and awaiting its first feature spec.
        </p>
      </main>
    </div>
  );
}
