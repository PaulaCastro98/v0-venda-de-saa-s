'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Percent, Users, TrendingUp, Zap } from 'lucide-react';

export default function AffiliatesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-accent/10 to-background border-b border-border p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link href="/">
              <Button variant="ghost">← Voltar</Button>
            </Link>
          </div>
          <div className="text-center py-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Programa de Afiliados SimpleWork</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ganhe comissões por cada cliente que você indicar. Quanto mais você recomenda, mais você ganha.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* CTA Section */}
        <div className="mb-16">
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Comece a Ganhar Agora</h2>
            <p className="text-muted-foreground mb-6">
              Registre-se como afiliado e comece a indicar nossos sistemas para seu público.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/afiliados/cadastro">
                <Button className="bg-accent hover:bg-accent/90 px-8">Registrar como Afiliado</Button>
              </Link>
              <Link href="/afiliados/login">
                <Button variant="outline" className="px-8">Já tenho conta</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <Zap className="w-12 h-12 text-accent mx-auto mb-4" />
                <CardTitle>1. Registre-se</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Cadastre-se como afiliado em menos de 2 minutos. Preencha seus dados básicos e chave PIX.
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                <CardTitle>2. Compartilhe</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Compartilhe seu código de referência com seus contatos, redes sociais ou blog.
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
                <CardTitle>3. Ganhe Comissões</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Receba R$ 10-15 por cada cliente que você indicar e contrate um de nossos planos.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Benefícios Exclusivos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Percent className="w-6 h-6 text-accent mb-2" />
                <CardTitle>Comissões Competitivas</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Ganhe R$ 10 por cliente no plano Essencial, R$ 15 nos outros planos, totalizando até R$ 180 por ano por cliente.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-6 h-6 text-accent mb-2" />
                <CardTitle>Desconto para Referidos</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Seus clientes indicados recebem 50% de desconto no primeiro mês, tornando a conversão mais fácil.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-6 h-6 text-accent mb-2" />
                <CardTitle>Painel Intuitivo</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Acompanhe seus leads, clientes e comissões em tempo real através de um painel fácil de usar.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="w-6 h-6 text-accent mb-2" />
                <CardTitle>Pagamentos via PIX</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Receba suas comissões diretamente em sua conta bancária via PIX instantaneamente.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Commission Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Tabela de Comissões</h2>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-foreground">Plano</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Valor Mensal</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Comissão (1ª conversão)</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Ganho Anual (1 cliente)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 text-foreground font-medium">Essencial</td>
                      <td className="py-3 px-4 text-foreground">R$ 50</td>
                      <td className="py-3 px-4 text-accent font-bold">R$ 10</td>
                      <td className="py-3 px-4 text-green-600 font-bold">R$ 120</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 text-foreground font-medium">Profissional</td>
                      <td className="py-3 px-4 text-foreground">R$ 90</td>
                      <td className="py-3 px-4 text-accent font-bold">R$ 15</td>
                      <td className="py-3 px-4 text-green-600 font-bold">R$ 180</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 text-foreground font-medium">Empresarial</td>
                      <td className="py-3 px-4 text-foreground">R$ 190</td>
                      <td className="py-3 px-4 text-accent font-bold">R$ 15</td>
                      <td className="py-3 px-4 text-green-600 font-bold">R$ 180</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-foreground font-medium">Personalizado</td>
                      <td className="py-3 px-4 text-foreground">Sob demanda</td>
                      <td className="py-3 px-4 text-accent font-bold">Negociável</td>
                      <td className="py-3 px-4 text-green-600 font-bold">Negociável</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                * Comissão paga uma única vez quando o cliente faz a conversão. Clientes indicados recebem 50% de desconto no primeiro mês.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Como recebo as comissões?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                As comissões são pagas via PIX instantaneamente assim que o cliente faz sua primeira compra. Você pode acompanhar tudo no seu painel.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Existe limite de clientes que posso indicar?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Não! Você pode indicar quantos clientes quiser. Quanto mais você indicar, mais você ganha.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso usar meu código em redes sociais?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Sim, totalmente! Você pode compartilhar seu código em Instagram, Facebook, LinkedIn, blog, YouTube ou qualquer outro canal.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Existe alguma taxa de inscrição?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Não, é totalmente gratuito! Você só ganha quando seus clientes fazem a conversão.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Pronto para começar?</h2>
          <p className="text-muted-foreground mb-6">
            Junte-se a centenas de afiliados que já estão ganhando com SimpleWork
          </p>
          <Link href="/afiliados/cadastro">
            <Button className="bg-accent hover:bg-accent/90 px-8 py-6 text-base">
              Registre-se Gratuitamente Agora
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 bg-card">
        <div className="max-w-7xl mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2026 SimpleWork. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
