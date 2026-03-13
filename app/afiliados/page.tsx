'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AffiliateSidebar } from '@/components/affiliate-sidebar';
import { Users, DollarSign, TrendingUp, Copy, Check, Plus, LogOut } from 'lucide-react';
import Link from 'next/link';

interface AffiliateData {
  id: number;
  user_id: number;
  referral_code: string;
  pix_key: string;
  status: string;
  total_earned: number; // ✅ MUDADO PARA NUMBER
  total_leads: number;
  total_clients: number;
  name: string;
  email: string;
  pending_commissions: number; // ✅ ADICIONADO
}

export default function AffiliateDashboardPage() {
  const router = useRouter();
  const [affiliate, setAffiliate] = useState<AffiliateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('affiliate_email');
    console.log('[v0] Dashboard: checking email in localStorage:', email);

    if (!email) {
      console.log('[v0] Dashboard: No email found, redirecting to login');
      router.push('/afiliados/login');
      return;
    }

    async function fetchData() {
      try {
        console.log('[v0] Dashboard: Fetching profile for:', email);

        const response = await fetch(
          `/api/affiliates/profile?email=${encodeURIComponent(email as string)}`
        );

        console.log('[v0] Dashboard: Profile response status:', response.status);

        const data = await response.json();
        console.log('[v0] Dashboard: Profile data:', data);

        if (!response.ok) {
          console.log('[v0] Dashboard: Profile error:', data.error);
          throw new Error(data.error || 'Não autorizado');
        }

        // ✅ Garante que total_earned e pending_commissions são números
        setAffiliate({
          ...data,
          total_earned: parseFloat(String(data.total_earned || 0)),
          pending_commissions: parseFloat(String(data.pending_commissions || 0)),
        });
      } catch (error) {
        console.error('[v0] Dashboard: Error fetching profile:', error);
        // Se houver erro, pode ser que o token expirou ou o afiliado não existe mais
        // Redirecionar para login pode ser uma boa estratégia
        localStorage.removeItem('affiliate_email');
        router.push('/afiliados/login');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('affiliate_email');
    router.push('/afiliados/login');
  };

  const copyReferralCode = () => {
    if (affiliate?.referral_code) {
      navigator.clipboard.writeText(affiliate.referral_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (!affiliate) {
    return null; // Ou uma mensagem de erro/redirecionamento
  }

  // ✅ Calcula o Total Geral
  const totalGeral = (affiliate.total_earned + affiliate.pending_commissions);

  return (
    <div className="min-h-screen bg-background flex">
      <AffiliateSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Olá, {affiliate.name?.split(' ')[0]}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Bem-vindo ao seu painel de afiliado
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>

          {/* Referral Code Card */}
          <Card className="mb-8 border-accent/20 bg-accent/5">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Seu código de indicação</p>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-foreground tracking-wider">
                      {affiliate.referral_code}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyReferralCode}
                      className="gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <Link href="/afiliados/novo-lead">
                  <Button className="bg-accent hover:bg-accent/90 gap-2">
                    <Plus className="w-4 h-4" />
                    Indicar Cliente
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"> {/* ✅ Mudei para 4 colunas */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Leads
                </CardTitle>
                <Users className="w-5 h-5 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {affiliate.total_leads || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Clientes indicados
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Clientes Ativos
                </CardTitle>
                <TrendingUp className="w-5 h-5 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {affiliate.total_clients || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Que assinaram um plano
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Recebido
                </CardTitle>
                <DollarSign className="w-5 h-5 text-green-600" /> {/* ✅ Cor do ícone */}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  R$ {affiliate.total_earned.toFixed(2).replace('.', ',')} {/* ✅ toFixed direto */}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Em comissões pagas
                </p>
              </CardContent>
            </Card>

            <Card> {/* ✅ NOVO CARD: Pendente */}
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pendente
                </CardTitle>
                <DollarSign className="w-5 h-5 text-yellow-600" /> {/* ✅ Cor do ícone */}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">
                  R$ {affiliate.pending_commissions.toFixed(2).replace('.', ',')}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Comissões a receber
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-4"> {/* ✅ NOVO CARD: Total Geral, ocupando todas as colunas */}
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Geral
                </CardTitle>
                <DollarSign className="w-5 h-5 text-blue-600" /> {/* ✅ Cor do ícone */}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  R$ {totalGeral.toFixed(2).replace('.', ',')}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total de comissões (recebidas + pendentes)
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <h2 className="text-xl font-semibold text-foreground mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/afiliados/novo-lead">
              <Card className="cursor-pointer hover:border-accent/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <Plus className="w-8 h-8 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground">Novo Lead</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Indicar um novo cliente
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/afiliados/meus-leads">
              <Card className="cursor-pointer hover:border-accent/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground">Meus Leads</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ver todos os leads
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/afiliados/comissoes">
              <Card className="cursor-pointer hover:border-accent/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground">Comissões</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ver histórico de ganhos
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Status Card */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Informações da Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <span className="ml-2 text-foreground">{affiliate.email}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Chave PIX:</span>
                  <span className="ml-2 text-foreground">{affiliate.pix_key}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                    affiliate.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {affiliate.status === 'active' ? 'Ativo' : 'Bloqueado'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}