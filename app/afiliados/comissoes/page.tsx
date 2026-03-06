'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Zap } from 'lucide-react';
import Link from 'next/link';

interface Commission {
  id: number;
  commission_amount: number;
  status: string;
  created_at: string;
  client_name: string;
  plan_name: string;
}

export default function CommissionsPage() {
  const router = useRouter();
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [affiliate, setAffiliate] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const email = localStorage.getItem('affiliate_email');
    if (!email) {
      router.push('/afiliados/cadastro');
      return;
    }

    fetch(`/api/affiliates/profile?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setAffiliate(data);
        return fetch(`/api/affiliates/commissions?affiliate_id=${data.id}`);
      })
      .then((res) => res.json())
      .then((data) => {
        setCommissions(data.commissions || []);
        setStats(data.stats);
      })
      .catch(console.error);
  }, [router]);

  const totalEarned = stats?.total_paid || 0;
  const pendingCommissions = stats?.pending_commissions || 0;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-2">SimpleWork Afiliados</h2>
          {affiliate && <p className="text-sm text-muted-foreground truncate">{affiliate.name}</p>}
        </div>

        <nav className="space-y-2 mb-8">
          <Link href="/afiliados">
            <Button variant="ghost" className="w-full justify-start">
              <Zap className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link href="/afiliados/meus-leads">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Meus Leads
            </Button>
          </Link>
          <Link href="/afiliados/comissoes">
            <Button variant="default" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              Comissões
            </Button>
          </Link>
        </nav>

        <Button
          variant="outline"
          className="w-full text-red-600"
          onClick={() => {
            localStorage.removeItem('affiliate_email');
            router.push('/afiliados/cadastro');
          }}
        >
          Sair
        </Button>
      </aside>

      {/* Main Content */}
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
                <div className="text-3xl font-bold text-green-600">R$ {totalEarned.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pendente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">R$ {pendingCommissions.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">R$ {(totalEarned + pendingCommissions).toFixed(2)}</div>
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
                          <td className="py-3 px-4 font-bold text-green-600">R$ {commission.commission_amount.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                commission.status === 'paid'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {commission.status === 'paid' ? 'Pago' : 'Pendente'}
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
