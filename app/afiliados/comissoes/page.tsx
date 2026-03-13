// app/afiliados/comissoes/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';   
import { AffiliateSidebar } from '@/components/affiliate-sidebar';

interface Commission {
  id: number;
  commission_amount: number;
  status: string;
  created_at: string;
  client_name: string;
  plan_name: string;
}

interface AffiliateStats {
  total_paid: number;
  pending_commissions: number;
}

export default function CommissionsPage() {
  const router = useRouter();
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem('affiliate_email');
    if (!email) {
      router.push('/afiliados/login');
      return;
    }

    async function fetchAffiliateData() {
      try {
        // Primeiro, busca o perfil do afiliado para obter o ID
        // ✅ Corrigido: Garante que email é string antes de encodeURIComponent
        const profileRes = await fetch(`/api/affiliates/profile?email=${encodeURIComponent(email as string)}`);
        const profileData = await profileRes.json();

        if (!profileRes.ok || !profileData.id) {
          console.error('Erro ao buscar perfil do afiliado:', profileData.error);
          router.push('/afiliados/login'); // Redireciona se não conseguir o ID
          return;
        }

        const affiliateId = profileData.id;

        // Em seguida, busca as comissões e stats usando o ID do afiliado
        const commissionsRes = await fetch(`/api/affiliates/commissions?affiliate_id=${affiliateId}`);       
        const commissionsData = await commissionsRes.json();

        if (!commissionsRes.ok) {
          console.error('Erro ao buscar comissões:', commissionsData.error);
          setCommissions([]);
          setStats({ total_paid: 0, pending_commissions: 0 });
          return;
        }

        setCommissions(
          (commissionsData.commissions || []).map((comm: any) => ({
            ...comm,
            commission_amount: parseFloat(String(comm.commission_amount || 0)),
          }))
        );
        setStats({
          total_paid: parseFloat(String(commissionsData.stats?.total_paid || 0)),
          pending_commissions: parseFloat(String(commissionsData.stats?.pending_commissions || 0)),
        });

      } catch (error) {
        console.error('Erro geral ao buscar dados do afiliado:', error);
        router.push('/afiliados/login'); // Redireciona em caso de erro grave
      } finally {
        setLoading(false);
      }
    }

    fetchAffiliateData();
  }, [router]);

  const totalEarned = stats?.total_paid || 0;
  const pendingCommissions = stats?.pending_commissions || 0;
  const totalGeral = totalEarned + pendingCommissions;


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>   
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AffiliateSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Minhas Comissões</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Recebido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">R$ {totalEarned.toFixed(2).replace('.', ',')}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pendente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">R$ {pendingCommissions.toFixed(2).replace('.', ',')}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">R$ {totalGeral.toFixed(2).replace('.', ',')}</div>
              </CardContent>
            </Card>
          </div>

          {/* Commissions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Comissões</CardTitle>
            </CardHeader>
            <CardContent>
              {commissions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhuma comissão ainda. Continue indicando clientes!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-foreground">Cliente</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Plano</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Valor</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commissions.map((commission) => (
                        <tr key={commission.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4 text-foreground font-medium">{commission.client_name}</td>
                          <td className="py-3 px-4 text-foreground">{commission.plan_name}</td>
                          <td className="py-3 px-4 font-bold text-green-600">R$ {commission.commission_amount.toFixed(2).replace('.', ',')}</td>
                          <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            commission.status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : commission.status === 'approved'
                              ? 'bg-blue-100 text-blue-800'
                              : commission.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {commission.status === 'paid'
                              ? '✅ Pago'
                              : commission.status === 'approved'
                              ? '⏳ Aprovado'
                              : commission.status === 'pending'
                              ? '⏳ Pendente'
                              : '🚫 Rejeitado'}
                          </span>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground text-sm"> 
                            {new Date(commission.created_at).toLocaleDateString('pt-BR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}