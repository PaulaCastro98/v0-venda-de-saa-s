// app/admin/leads/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Lead {
  id: number;
  affiliate_id: number;
  company_name: string | null;
  cnpj: string | null;
  client_name: string | null; // Mapeado de contact_name
  client_email: string | null; // Mapeado de contact_email
  contact_whatsapp: string | null;
  product_id: number;
  product_name: string; // Adicionado para exibição
  plan_id: number;
  plan_name: string; // Adicionado para exibição
  status: string;
  created_at: string;
  updated_at: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      // ✅ Busca todos os leads diretamente da API de leads, sem precisar de afiliados primeiro
      const res = await fetch('/api/admin/leads');
      if (!res.ok) {
        throw new Error('Falha ao buscar leads.');
      }
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error('Erro ao buscar leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (leadId: number, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao atualizar lead no servidor.');
      }

      const data = await response.json();
      const updatedLeadFromServer = data.lead; // ✅ Pega o lead atualizado do servidor

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId
            ? { ...lead, status: updatedLeadFromServer.status, updated_at: updatedLeadFromServer.updated_at }
            : lead
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
      alert(`Ocorreu um erro ao atualizar o lead: ${error instanceof Error ? error.message : String(error)}`);
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
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Leads</h1>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Leads de Afiliados</CardTitle>
            </CardHeader>
            <CardContent>
              {leads.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhum lead registrado</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-foreground">Cliente</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Produto</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Plano</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Data</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium text-foreground">{lead.client_name || lead.company_name}</td>
                          <td className="py-3 px-4 text-foreground">{lead.client_email}</td>
                          <td className="py-3 px-4 text-foreground">{lead.product_name}</td>
                          <td className="py-3 px-4 text-foreground">{lead.plan_name}</td>
                          <td className="py-3 px-4 text-muted-foreground text-sm">
                            {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="py-3 px-4">
                            <Select
                              value={lead.status}
                              onValueChange={(value) => handleStatusChange(lead.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="converted">Convertido</SelectItem>
                                <SelectItem value="rejected">Rejeitado</SelectItem>
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