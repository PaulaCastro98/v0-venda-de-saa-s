import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, MessageCircle, Zap, Shield, Headphones, BarChart3, Users, RefreshCw } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { products, getProductBySlug, getProductsByCategory } from "@/lib/products"
import { getWhatsAppLink, buildProductMessage } from "@/lib/whatsapp"

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: "Sistema nao encontrado" }
  return {
    title: `${product.name} - SimpleWork`,
    description: product.description,
  }
}

const systemFeatures = [
  { icon: Zap, label: "Implantacao rapida" },
  { icon: Shield, label: "Dados seguros" },
  { icon: Headphones, label: "Suporte 24h" },
  { icon: BarChart3, label: "Relatorios" },
  { icon: Users, label: "Multiusuarios" },
  { icon: RefreshCw, label: "Atualizacoes gratis" },
]

const includedFeatures = [
  "Painel de gestao completo e intuitivo",
  "Sistema de agendamento online integrado",
  "Programa de indicacao e afiliados",
  "Captacao automatica de novos clientes",
  "Gestao financeira e relatorios",
  "Notificacoes automaticas via email e SMS",
  "Aplicativo responsivo para celular e tablet",
  "Integracoes com WhatsApp e redes sociais",
  "Backup automatico dos seus dados",
  "Suporte tecnico 24 horas por dia",
]

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) notFound()

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <Link href="/#sistemas" className="mb-6 inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground/80">
              <ArrowLeft className="h-4 w-4" />
              Voltar para sistemas
            </Link>

            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent">
                  {product.category}
                </span>
                <h1 className="mt-4 text-balance text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  Sistema para {product.name}
                </h1>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-primary-foreground/70">
                  {product.description}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href={`/cadastro?sistema=${product.slug}`}>
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      Contratar agora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <a
                    href={getWhatsAppLink(buildProductMessage(product.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" variant="outline" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Tirar duvidas
                    </Button>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {systemFeatures.map((feature) => (
                  <div key={feature.label} className="flex flex-col items-center gap-2 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-4 text-center">
                    <feature.icon className="h-6 w-6 text-accent" />
                    <span className="text-xs font-medium text-primary-foreground/80">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-background px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-accent">O que esta incluso</p>
                <h2 className="mt-3 text-balance text-2xl font-bold text-foreground md:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  Tudo que voce precisa para gerenciar seu negocio de {product.name.toLowerCase()}
                </h2>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                  Nosso sistema foi desenvolvido especificamente para o segmento de {product.name.toLowerCase()}, com todas as ferramentas que voce precisa para captar clientes, gerenciar agendamentos e crescer seu faturamento.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {includedFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing CTA */}
        <section className="bg-secondary px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-2xl font-bold text-foreground md:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Comece a partir de R$ 50/mes
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Escolha o plano ideal para o tamanho do seu negocio. Sem fidelidade, sem taxa de implantacao.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={`/cadastro?sistema=${product.slug}`}>
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Escolher plano e comecar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/#planos">
                <Button size="lg" variant="outline">
                  Ver todos os planos
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="bg-background px-6 py-20">
            <div className="mx-auto max-w-7xl">
              <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                Outros sistemas de {product.category}
              </h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/sistema/${rp.slug}`}
                    className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <span className="text-sm font-bold text-accent">{rp.name[0]}</span>
                    </div>
                    <h4 className="mt-3 text-sm font-semibold text-foreground">{rp.name}</h4>
                    <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">{rp.shortDescription}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      Ver detalhes <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
