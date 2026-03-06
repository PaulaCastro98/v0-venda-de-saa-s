'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Lead {
  id: number;
  client_name: string;
  client_email: string;
  product_name: string;
  plan_name: string;
  status: string;
  created_at: string;
  affiliate_id: number;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all affiliates first to get their leads
    fetch('/api/admin/affiliates')
      .then((res) => res.json())
      .then((data) => {
        const affiliates = data.affiliates || [];
        const allLeads: Lead[] = [];

        // For each affiliate, fetch their leads
        Promise.all(
          affiliates.map((aff: any) =>
            fetch(`/api/admin/leads?affiliate_id=${aff.id}`)
              .then((res) => res.json())
              .then((data) => {
                allLeads.push(...(data.leads || []));
              })
          )
        )
          .then(() => {
            setLeads(allLeads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
            setLoading(false);
          })
          .catch(() => setLoading(false));
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStatusChange = async (leadId: number, newStatus: string) => {
    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId,
          status: newStatus,
        }),
      });

      setLeads((prev) =>
        prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
      );
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
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
                          <td className="py-3 px-4 font-medium text-foreground">{lead.client_name}</td>
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
