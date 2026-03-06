'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, DollarSign, BarChart } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  total_affiliates: number;
  total_leads: number;
  total_commissions: number;
  pending_commissions: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetch('/api/admin/affiliates')
      .then((res) => res.json())
      .then((data) => {
        const affiliates = data.affiliates || [];
        setStats({
          total_affiliates: affiliates.length,
          total_leads: affiliates.reduce((sum: number, a: any) => sum + a.total_leads, 0),
          total_commissions: affiliates.reduce((sum: number, a: any) => sum + a.total_earned, 0),
          pending_commissions: 0,
        });
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">Painel Admin - Afiliados</h1>
          <Link href="/">
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Total Afiliados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats?.total_affiliates || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Total Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats?.total_leads || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Total Pago
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">R$ {(stats?.total_commissions || 0).toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <BarChart className="w-4 h-4" />
                  Pendente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">R$ {(stats?.pending_commissions || 0).toFixed(2)}</div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/afiliados">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    Gerenciar Afiliados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Visualize e bloqueie afiliados</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/leads">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Gerenciar Leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Acompanhe conversões</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/comissoes">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-accent" />
                    Gerenciar Comissões
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Marque como pagas</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
