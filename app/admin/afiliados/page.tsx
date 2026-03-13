// app/admin/afiliados/page.tsx
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
  blocked_reason: string | null;
}

export default function AdminAffiliatesPage() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBlockReasonInput, setShowBlockReasonInput] = useState<number | null>(null); // ID do afiliado para mostrar input
  const [blockReason, setBlockReason] = useState('');

  useEffect(() => {
    fetchAffiliates();
  }, []);

  const fetchAffiliates = async () => {
    try {
      const res = await fetch('/api/admin/affiliates');
      const data = await res.json();
      setAffiliates(
        (data.affiliates || []).map((aff: any) => ({
          ...aff,
          total_earned: parseFloat(String(aff.total_earned || 0)), // Garante que é número
        }))
      );
    } catch (err) {
      console.error('Erro ao buscar afiliados:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (affiliateId: number, newStatus: string, reason: string | null = null) => {
    try {
      const response = await fetch('/api/admin/affiliates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: affiliateId,
          status: newStatus,
          blocked_reason: newStatus === 'blocked' ? reason : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao atualizar afiliado no servidor.');
      }

      const data = await response.json();
      const updatedAffiliateFromServer = data.affiliate; // ✅ Pega o afiliado atualizado do servidor

      setAffiliates((prev) =>
        prev.map((aff) =>
          aff.id === affiliateId
            ? {
                ...aff,
                status: updatedAffiliateFromServer.status, // ✅ Usa o status do servidor
                blocked_reason: updatedAffiliateFromServer.blocked_reason, // ✅ Usa o motivo do servidor
                total_earned: parseFloat(String(updatedAffiliateFromServer.total_earned || 0)),
              }
            : aff
        )
      );
      // Limpa o estado do input de bloqueio
      setBlockReason('');
      setShowBlockReasonInput(null);
    } catch (error) {
      console.error('Erro ao atualizar afiliado:', error);
      alert(`Ocorreu um erro ao atualizar o afiliado: ${error instanceof Error ? error.message : String(error)}`);
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
                        <th className="text-left py-3 px-4 font-medium text-foreground">Ações</th>
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
                          <td className="py-3 px-4 text-green-600 font-bold">
                            R$ {aff.total_earned.toFixed(2).replace('.', ',')}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              aff.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : aff.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : aff.status === 'blocked'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800' // Fallback
                            }`}>
                              {aff.status === 'active' ? '✅ Ativo'
                                : aff.status === 'pending' ? '⏳ Pendente'
                                : aff.status === 'blocked' ? '🚫 Bloqueado'
                                : 'Desconhecido'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Select
                              value={aff.status}
                              onValueChange={(value: string) => {
                                if (value === 'blocked') {
                                  setShowBlockReasonInput(aff.id); // Mostra o input para este afiliado
                                } else {
                                  handleStatusChange(aff.id, value);
                                }
                              }}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="active">Ativo</SelectItem>
                                <SelectItem value="blocked">Bloqueado</SelectItem>
                              </SelectContent>
                            </Select>
                            {/* Input para o motivo de bloqueio, exibido condicionalmente */}
                            {showBlockReasonInput === aff.id && (
                              <div className="mt-2 flex gap-2">
                                <Input
                                  type="text"
                                  placeholder="Motivo do bloqueio"
                                  value={blockReason}
                                  onChange={(e) => setBlockReason(e.target.value)}
                                  className="flex-1"
                                />
                                <Button
                                  onClick={() => {
                                    if (blockReason.trim()) {
                                      handleStatusChange(aff.id, 'blocked', blockReason);
                                    } else {
                                      alert('Por favor, insira um motivo para bloquear.');
                                    }
                                  }}
                                >
                                  Bloquear
                                </Button>
                                <Button variant="outline" onClick={() => setShowBlockReasonInput(null)}>
                                  Cancelar
                                </Button>
                              </div>
                            )}
                            {/* Exibe o motivo do bloqueio se houver e o status for bloqueado */}
                            {aff.status === 'blocked' && aff.blocked_reason && (
                              <p className="text-xs text-red-500 mt-1">Motivo: {aff.blocked_reason}</p>
                            )}
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