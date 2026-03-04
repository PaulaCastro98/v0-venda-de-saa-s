import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RegistrationForm } from "@/components/registration-form"

export const metadata: Metadata = {
  title: "Cadastro - SimpleWork",
  description: "Cadastre-se e escolha o plano ideal para o seu negocio.",
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
          <RegistrationForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}