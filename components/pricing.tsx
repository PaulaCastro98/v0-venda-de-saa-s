"use client"

import Link from "next/link"
import { Check, ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getWhatsAppLink, buildPlanMessage } from "@/lib/whatsapp"

const plans = [
  {
    name: "Essencial",
    description: "Entrada simples para quem quer começar digital",
    price: "69,90",
    period: "/mês",
    popular: false,
    features: [
      "WhatsApp (link agendamento, bot simples)",
      "Agendamento de horário e data",
      "Relatório de venda mensal",
      "Gestão de clientes e serviços",
      "Landing page com agendamento",
      "Até 2 usuários",
      "Suporte: 8h-18h, seg-sex",
    ],
    cta: "Começar agora",
    href: "/cadastro?plano=essencial",
  },
  {
    name: "Profissional",
    description: "Para controlar melhor o negócio com mais canais",
    price: "149,90",
    period: "/mês",
    popular: true,
    features: [
      "Tudo do Plano Essencial, mais:",
      "E-mail (lembretes e comunicações)",
      "Relatórios completos avançados",
      "Produtos e pacotes no site",
      "Site com agendamento e WhatsApp",
      "Até 5 usuários",
      "Suporte prioritário: 8h-22h, seg-sab",
      "Informações da empresa no site",
    ],
    cta: "Começar agora",
    href: "/cadastro?plano=profissional",
  },
  {
    name: "Empresarial",
    description: "Para redes, clínicas e negócios com várias unidades",
    price: "A partir de 600",
    period: "",
    popular: false,
    features: [
      "Tudo do Plano Profissional, mais:",
      "Suporte 24 horas",
      "10+ usuários (ou ilimitados)",
      "Várias unidades integradas",
      "Painel por perfil (gestor, atendente...)",
      "Site personalizável",
      "Domínio próprio",
      "Sob consulta para regras de negócio",
    ],
    cta: "Consultar",
    href: "/cadastro?plano=empresarial",
  },
]

export function Pricing() {
  return (
    <section id="planos" className="bg-secondary px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Planos e precos</p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Escolha o plano ideal para o seu negocio
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Sem fidelidade, sem surpresas. Cancele quando quiser.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border bg-card p-8 ${
                plan.popular
                  ? "border-accent shadow-lg ring-1 ring-accent"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground">
                    Mais popular
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">R$</span>
                <span className="text-4xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                  {plan.price}
                </span>
                {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="mt-8">
                <Button
                  className={`w-full ${plan.popular ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Custom plan */}
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-card p-8 text-center">
          <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
            Sistema Personalizado
          </h3>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Precisa de algo sob medida? Desenvolvemos sistemas personalizados com todas as funcionalidades que seu negocio necessita. Consulte valores diretamente com nossa equipe.
          </p>
          <a
            href={getWhatsAppLink(buildPlanMessage("Sistema Personalizado"))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block"
          >
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <MessageCircle className="mr-2 h-4 w-4" />
              Falar no WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
