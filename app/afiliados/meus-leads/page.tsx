'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AffiliateSidebar } from '@/components/affiliate-sidebar';
import Link from 'next/link';

interface Lead {
  id: number;
  product_name: string;
  plan_name: string;
  price: number;
  client_email: string;
  client_name: string;
  status: string;
  created_at: string;
}

export default function MyLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem('affiliate_email');
    if (!email) {
      router.push('/afiliados/login');
      return;
    }

    fetch(`/api/affiliates/profile?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        return fetch(`/api/affiliates/leads?affiliate_id=${data.id}`);
      })
      .then((res) => res.json())
      .then((data) => setLeads(data.leads || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [router]);

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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">Meus Leads</h1>
            <Link href="/afiliados/novo-lead">
              <Button className="bg-accent hover:bg-accent/90">Adicionar Lead</Button>
            </Link>
          </div>

          {/* Leads Table */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Leads</CardTitle>
            </CardHeader>
            <CardContent>
              {leads.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhum lead ainda. Comece a indicar clientes!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-foreground">Cliente</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Produto</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Plano</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4 text-foreground">
                            <div>
                              <p className="font-medium">{lead.client_name}</p>
                              <p className="text-sm text-muted-foreground">{lead.client_email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-foreground">{lead.product_name}</td>
                          <td className="py-3 px-4 text-foreground">
                            {lead.plan_name} - R$ {lead.price.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                lead.status === 'converted'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {lead.status === 'converted' ? 'Convertido' : 'Pendente'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground text-sm">
                            {new Date(lead.created_at).toLocaleDateString('pt-BR')}
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

