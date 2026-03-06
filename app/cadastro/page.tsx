import type { Metadata } from "next"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RegistrationForm } from "@/components/registration-form"

export const metadata: Metadata = {
  title: "Cadastro - SimpleWork",
  description: "Cadastre-se e escolha o plano ideal para o seu negocio.",
}

function RegistrationFormSkeleton() {
  return (
    <div className="mt-10">
      <div className="mb-10 flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted" />
            {s < 3 && <div className="h-px w-12 bg-border" />}
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="h-6 w-32 bg-muted rounded" />
        <div className="mt-4 h-4 w-64 bg-muted rounded" />
        <div className="mt-8 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-muted rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CadastroPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="bg-background px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Crie sua conta
            </h1>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Preencha seus dados, escolha o plano e comece a usar agora.
            </p>
          </div>
          <Suspense fallback={<RegistrationFormSkeleton />}>
            <RegistrationForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
