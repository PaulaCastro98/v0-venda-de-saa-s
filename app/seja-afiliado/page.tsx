import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Zap, Users, Gift, DollarSign, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Programa de Afiliados SimpleWork - Ganhe Renda Recorrente',
  description: 'Venda produtos SimpleWork e ganhe comissões mensais recorrentes. Junte-se ao nosso programa de afiliados agora!',
};

export default function SejaAfiliadoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background px-6 py-20 md:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <div className="mb-6 inline-block rounded-full bg-accent/10 px-4 py-2">
                <span className="text-sm font-medium text-accent">Ganhe enquanto dorme</span>
              </div>
              <h1 
                className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Vire um Afiliado SimpleWork e Multiplique seus Ganhos
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Comissões recorrentes mensais a cada indicação. Sem limite de ganhos. Quanto mais você indica, mais você ganha todos os meses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/afiliados/cadastro">
                  <Button size="lg" className="gap-2">
                    Comece Agora <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/legal/regras-afiliados">
                  <Button size="lg" variant="outline">
                    Ver Regras do Programa
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Stats */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">R$ 10-25</div>
                <p className="text-sm text-muted-foreground">Comissão por indicação</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">∞ Sem Limite</div>
                <p className="text-sm text-muted-foreground">Ganhe quantas vezes quiser</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">Mensais</div>
                <p className="text-sm text-muted-foreground">Ganhos recorrentes sempre</p>
              </div>
            </div>
          </div>
        </section>

        {/* Por que ser afiliado */}
        <section className="px-6 py-20 md:py-32">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
              Por que virar um Afiliado SimpleWork?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Renda Recorrente */}
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Renda Recorrente Mensal</h3>
                <p className="text-muted-foreground mb-4">
                  Cada venda que você faz gera uma comissão que volta todo mês enquanto o cliente mantiver a assinatura. Seus ganhos acumulam!
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Comissão permanente enquanto cliente for ativo</span>
                  </li>
                  <li className="flex gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Sem limite de tempo para receber</span>
                  </li>
                </ul>
              </div>

              {/* Sem esforço contínuo */}
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Simples e Automático</h3>
                <p className="text-muted-foreground mb-4">
                  Indique uma vez, ganhe para sempre. Sem burocracia, sem complicação. Nós cuidamos de tudo.
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Código de referência único para rastrear</span>
                  </li>
                  <li className="flex gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Dashboard com todas as métricas em tempo real</span>
                  </li>
                </ul>
              </div>

              {/* Alto potencial */}
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Comissões Competitivas</h3>
                <p className="text-muted-foreground mb-4">
                  Receba de R$10 a R$25 por indicação, dependendo do plano. Quanto maior o plano, maior a comissão.
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Essencial: R$10/mês por cliente</span>
                  </li>
                  <li className="flex gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Profissional: R$15/mês por cliente</span>
                  </li>
                </ul>
              </div>

              {/* Comunidade */}
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Comunidade de Afiliados</h3>
                <p className="text-muted-foreground mb-4">
                  Faça parte de uma comunidade crescente de empreendedores que lucram indicando SimpleWork.
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Suporte dedicado via WhatsApp</span>
                  </li>
                  <li className="flex gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Materiais de marketing prontos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Exemplo de ganhos */}
        <section className="px-6 py-20 md:py-32 bg-primary/5">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
              Veja o Potencial de Ganhos
            </h2>

            <div className="bg-card rounded-2xl border border-border p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Cenário 1: Iniciante</h4>
                    <div className="text-4xl font-bold text-foreground">10 Clientes</div>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span>7 Essencial (R$10)</span>
                      <span className="font-semibold text-foreground">R$70</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3 Profissional (R$15)</span>
                      <span className="font-semibold text-foreground">R$45</span>
                    </div>
                    <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-foreground">
                      <span>Ganho Mensal:</span>
                      <span className="text-accent text-lg">R$115</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Cenário 2: Experiente</h4>
                    <div className="text-4xl font-bold text-foreground">50 Clientes</div>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span>30 Essencial (R$10)</span>
                      <span className="font-semibold text-foreground">R$300</span>
                    </div>
                    <div className="flex justify-between">
                      <span>20 Profissional (R$15)</span>
                      <span className="font-semibold text-foreground">R$300</span>
                    </div>
                    <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-foreground">
                      <span>Ganho Mensal:</span>
                      <span className="text-accent text-lg">R$600</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-sm text-muted-foreground text-center">
                  <span className="font-semibold text-foreground">Lembre-se:</span> Esses são ganhos <strong>recorrentes mensais</strong>. Quanto mais você indica, mais seus ganhos aumentam a cada mês!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="px-6 py-20 md:py-32">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
              Como Funciona
            </h2>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent text-primary font-bold">1</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Cadastre-se Gratuitamente</h3>
                  <p className="text-muted-foreground">Faça seu registro como afiliado em menos de 5 minutos. Nós verificamos seus dados e você já começa a indicar.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent text-primary font-bold">2</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Compartilhe Seu Código</h3>
                  <p className="text-muted-foreground">Receba um código de referência único. Compartilhe com amigos, clientes, nas redes sociais. Quanto mais compartilhar, mais ganha.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent text-primary font-bold">3</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Acompanhe em Tempo Real</h3>
                  <p className="text-muted-foreground">Seu dashboard mostra todos os leads, conversões e comissões geradas. Você sempre sabe exatamente quanto está ganhando.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent text-primary font-bold">4</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Receba Mensalmente</h3>
                  <p className="text-muted-foreground">Ganhe comissões todos os meses enquanto seus clientes mantiverem as assinaturas ativas. Receba via PIX direto na sua conta.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="px-6 py-20 md:py-32 bg-primary/5">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Pronto para Começar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Junte-se a centenas de afiliados que já ganham renda recorrente vendendo SimpleWork
            </p>
            <Link href="/afiliados/cadastro">
              <Button size="lg" className="gap-2">
                Cadastre-se Agora <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
