'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Commission {
  id: number;
  affiliate_name: string;
  client_name: string;
  plan_name: string;
  commission_amount: number;
  status: string;
  created_at: string;
}

export default function AdminCommissionsPage() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/commissions')
      .then((res) => res.json())
      .then((data) => {
        setCommissions(data.commissions || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (commissionId: number, newStatus: string) => {
    try {
      await fetch('/api/admin/commissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: commissionId,
          status: newStatus,
        }),
      });

      setCommissions((prev) =>
        prev.map((comm) => (comm.id === commissionId ? { ...comm, status: newStatus } : comm))
      );
    } catch (error) {
      console.error('Erro ao atualizar comissão:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/admin">
            <Button variant="ghost" className="mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Comissões</h1>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Comissões de Afiliados</CardTitle>
            </CardHeader>
            <CardContent>
              {commissions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhuma comissão registrada</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-foreground">Afiliado</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Cliente</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Plano</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Valor</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Data</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commissions.map((comm) => (
                        <tr key={comm.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium text-foreground">{comm.affiliate_name}</td>
                          <td className="py-3 px-4 text-foreground">{comm.client_name}</td>
                          <td className="py-3 px-4 text-foreground">{comm.plan_name}</td>
                          <td className="py-3 px-4 font-bold text-green-600">R$ {comm.commission_amount.toFixed(2)}</td>
                          <td className="py-3 px-4 text-muted-foreground text-sm">
                            {new Date(comm.created_at).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="py-3 px-4">
                            <Select
                              value={comm.status}
                              onValueChange={(value: string) => handleStatusChange(comm.id, value)}
                            >
                              <SelectTrigger className="w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="paid">Pago</SelectItem>
                              </SelectContent>
                            </Select>
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