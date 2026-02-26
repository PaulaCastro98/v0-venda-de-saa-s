import { Zap, Shield, Headphones, BarChart3, Users, RefreshCw } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Pronto para usar",
    description: "Seu sistema esta disponivel em minutos. Sem instalacao, sem complicacao. Acesse de qualquer dispositivo.",
  },
  {
    icon: Shield,
    title: "Seguro e confiavel",
    description: "Seus dados estao protegidos com criptografia de ponta. Backups automaticos garantem que nada se perca.",
  },
  {
    icon: Headphones,
    title: "Suporte 24 horas",
    description: "Nossa equipe esta sempre disponivel para te ajudar. Atendimento rapido via WhatsApp ou chat.",
  },
  {
    icon: BarChart3,
    title: "Relatorios inteligentes",
    description: "Acompanhe metricas do seu negocio em tempo real. Tome decisoes com base em dados concretos.",
  },
  {
    icon: Users,
    title: "Multiusuarios",
    description: "Adicione sua equipe ao sistema. Controle permissoes e acompanhe a produtividade de cada colaborador.",
  },
  {
    icon: RefreshCw,
    title: "Atualizacoes constantes",
    description: "Novas funcionalidades toda semana. Seu sistema esta sempre evoluindo sem custo adicional.",
  },
]

export function Features() {
  return (
    <section id="sobre" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Por que a SimpleWork?</p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Tudo que seu negocio precisa em um so lugar
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            Desenvolvemos sistemas pensados para empreendedores que querem simplificar a gestao e focar no crescimento.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <feature.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
