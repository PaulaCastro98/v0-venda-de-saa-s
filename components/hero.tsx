import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const highlights = [
  "Mais de 100 sistemas prontos",
  "Suporte 24 horas",
  "Sem fidelidade",
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary px-6 py-24 lg:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-accent" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full border border-primary-foreground/20 px-4 py-1.5 text-xs font-medium text-primary-foreground/80">
            +1.000 empreendedores ja simplificaram seus negocios
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-heading)' }}>
            O sistema que o seu negocio precisa para crescer
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/70">
            Pare de perder tempo com processos manuais. A SimpleWork oferece sistemas completos, prontos para uso, com tudo que voce precisa para gerenciar e escalar o seu negocio.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/cadastro">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Comecar agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/#sistemas">
              <Button size="lg" variant="outline" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                Ver sistemas
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
