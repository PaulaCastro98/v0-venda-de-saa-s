'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { ArrowLeft, Lock, Unlock } from 'lucide-react';

interface Affiliate {
  id: number;
  name: string;
  email: string;
  referral_code: string;
  status: string;
  total_earned: number;
  total_leads: number;
  total_clients: number;
}

export default function AdminAffiliatesPage() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAff, setSelectedAff] = useState<Affiliate | null>(null);
  const [blockReason, setBlockReason] = useState('');

  useEffect(() => {
    fetch('/api/admin/affiliates')
      .then((res) => res.json())
      .then((data) => {
        setAffiliates(data.affiliates || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (affiliateId: number, newStatus: string) => {
    try {
      await fetch('/api/admin/affiliates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: affiliateId,
          status: newStatus,
          blocked_reason: newStatus === 'blocked' ? blockReason : null,
        }),
      });

      setAffiliates((prev) =>
        prev.map((aff) => (aff.id === affiliateId ? { ...aff, status: newStatus } : aff))
      );
    } catch (error) {
      console.error('Erro ao atualizar afiliado:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <Link href="/admin">
              <Button variant="ghost" className="mb-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Gerenciar Afiliados</h1>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Afiliados</CardTitle>
            </CardHeader>
            <CardContent>
              {affiliates.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhum afiliado cadastrado ainda</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-foreground">Nome</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Código</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Leads</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Clientes</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Ganhos</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {affiliates.map((aff) => (
                        <tr key={aff.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium text-foreground">{aff.name}</td>
                          <td className="py-3 px-4 text-foreground">{aff.email}</td>
                          <td className="py-3 px-4 text-muted-foreground font-mono">{aff.referral_code}</td>
                          <td className="py-3 px-4 text-foreground">{aff.total_leads}</td>
                          <td className="py-3 px-4 text-foreground">{aff.total_clients}</td>
                          <td className="py-3 px-4 text-green-600 font-bold">R$ {aff.total_earned.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <Select
                              value={aff.status}
                              onValueChange={(value: string) => handleStatusChange(aff.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Ativo</SelectItem>
                                <SelectItem value="blocked">Bloqueado</SelectItem>
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