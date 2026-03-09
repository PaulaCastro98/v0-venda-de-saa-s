"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Check, ArrowRight, ArrowLeft, MessageCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getWhatsAppLink, buildPlanMessage } from "@/lib/whatsapp"
import { products } from "@/lib/products"

const plans = [
  {
    id: "essencial",
    name: "Essencial",
    price: "R$ 69,90/mes",
    desc: "Ate 2 usuarios, agendamento, relatorio mensal",
  },
  {
    id: "profissional",
    name: "Profissional",
    price: "R$ 149,90/mes",
    desc: "Ate 5 usuarios, e-mail, relatorios avancados",
  },
  {
    id: "empresarial",
    name: "Empresarial",
    price: "A partir de R$ 600",
    desc: "10+ usuarios, multi-unidades, dominio proprio",
  },
]

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  cnpj: string
  plan: string
  sistema: string
}

export function RegistrationForm() {
  const searchParams = useSearchParams()
  const preselectedPlan = searchParams.get("plano") || ""
  const preselectedSistema = searchParams.get("sistema") || ""

  const [step, setStep] = useState(1)
  const [sending, setSending] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    cnpj: "",
    plan: preselectedPlan,
    sistema: preselectedSistema,
  })

  const selectedProduct = formData.sistema ? products.find((p) => p.slug === formData.sistema) : null

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isStep1Valid = formData.name && formData.email && formData.phone && formData.company && formData.cnpj
  const isStep2Valid = formData.plan

  const handleSubmit = () => {
    setSending(true)
    const planLabel = plans.find((p) => p.id === formData.plan)?.name || formData.plan
    const message = buildPlanMessage(planLabel, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || undefined,
      cnpj: formData.cnpj || undefined,
    })

    const fullMessage = selectedProduct
      ? `${message}\n\nSistema de interesse: ${selectedProduct.name}`
      : message

    const link = getWhatsAppLink(fullMessage)

    // Pequeno delay para UX
    setTimeout(() => {
      window.open(link, "_blank")
      setSending(false)
      setStep(3)
    }, 800)
  }

  return (
    <div className="mt-10">
      {/* Steps indicator */}
      <div className="mb-10 flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                step >= s
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {step > s ? <Check className="h-4 w-4" /> : s}
            </div>
            {s < 3 && (
              <div className={`h-px w-12 ${step > s ? "bg-accent" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
            Seus dados
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Preencha suas informacoes de contato</p>

          <div className="mt-6 flex flex-col gap-5">
            <div>
              <Label htmlFor="name">Nome completo *</Label>
              <Input
                id="name"
                placeholder="Seu nome"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="phone">WhatsApp / Telefone *</Label>
              <Input
                id="phone"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="company">Nome da empresa</Label>
              <Input
                id="company"
                placeholder="Sua empresa"
                value={formData.company}
                onChange={(e) => updateField("company", e.target.value)}
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <Label htmlFor="cnpj">CNPJ da empresa</Label>
              <Input
                id="cnpj"
                placeholder="00.000.000/0000-00"
                value={formData.cnpj}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "").slice(0, 14)
                  const formatted = raw
                    .replace(/^(\d{2})(\d)/, "$1.$2")
                    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
                    .replace(/\.(\d{3})(\d)/, ".$1/$2")
                    .replace(/(\d{4})(\d)/, "$1-$2")
                  updateField("cnpj", formatted)
                }}
                className="mt-1.5"
                required
              />
            </div>
          </div>

          {selectedProduct && (
            <div className="mt-6 rounded-lg border border-accent/20 bg-accent/5 p-4">
              <p className="text-xs font-medium text-accent">Sistema selecionado</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{selectedProduct.name}</p>
              <p className="text-xs text-muted-foreground">{selectedProduct.shortDescription}</p>
            </div>
          )}

          <Button
            className="mt-8 w-full bg-accent text-accent-foreground hover:bg-accent/90"
            size="lg"
            disabled={!isStep1Valid}
            onClick={() => setStep(2)}
          >
            Proximo: escolher plano
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Step 2: Plan selection */}
      {step === 2 && (
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
            Escolha seu plano
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Selecione o plano que melhor atende seu negocio</p>

          <div className="mt-6 flex flex-col gap-3">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => updateField("plan", plan.id)}
                className={`flex items-center justify-between rounded-xl border p-5 text-left transition-all ${
                  formData.plan === plan.id
                    ? "border-accent bg-accent/5 ring-1 ring-accent"
                    : "border-border bg-background hover:border-accent/30"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{plan.desc}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-foreground">{plan.price}</span>
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      formData.plan === plan.id
                        ? "border-accent bg-accent"
                        : "border-border"
                    }`}
                  >
                    {formData.plan === plan.id && <Check className="h-3 w-3 text-accent-foreground" />}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <Button
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={!isStep2Valid || sending}
              onClick={handleSubmit}
            >
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Enviar via WhatsApp
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Success */}
      {step === 3 && (
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <Check className="h-8 w-8 text-accent" />
          </div>
          <h2 className="mt-6 text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
            Cadastro enviado com sucesso!
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Suas informacoes foram enviadas para nosso WhatsApp. Nossa equipe entrara em contato em breve para finalizar a ativacao do seu sistema.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={getWhatsAppLink(
                buildPlanMessage(plans.find((p) => p.id === formData.plan)?.name || formData.plan, {
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  company: formData.company || undefined,
                })
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <MessageCircle className="mr-2 h-4 w-4" />
                Abrir WhatsApp novamente
              </Button>
            </a>
            <a href="/">
              <Button size="lg" variant="outline">
                Voltar para o inicio
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
