import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { ComponentType } from "react"

// Dynamic import que retorna um módulo. Tipamos como "any" aqui e depois
// criamos um componente wrapper que aceita props padrão.
const RegistrationFormLazy = dynamic(
  async () => {
    const mod = await import("@/components/registration-form")
    return (mod as any).RegistrationForm ?? (mod as any).default
  },
  { ssr: false }
)

// Wrapper que garante ao TypeScript que RegistrationFormLazy é um componente React.
// Você pode passar props se o seu RegistrationForm aceitar.
function RegistrationFormWrapper(props: any) {
  const Comp = RegistrationFormLazy as unknown as ComponentType<any>
  return <Comp {...props} />
}

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
            <h1
              className="text-3xl font-bold text-foreground md:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Crie sua conta
            </h1>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Preencha seus dados, escolha o plano e comece a usar agora.
            </p>
          </div>
          <RegistrationFormWrapper />
        </div>
      </main>
      <Footer />
    </div>
  )
}