'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LogOut, Home } from 'lucide-react';

export default function AffiliateSidebar() {
  const router = useRouter();
  const [affiliate, setAffiliate] = useState<any>(null);

  useEffect(() => {
    const email = localStorage.getItem('affiliate_email');
    if (!email) {
      router.push('/afiliados/cadastro');
      return;
    }

    fetch(`/api/affiliates/profile?email=${email}`)
      .then((res) => res.json())
      .then((data) => setAffiliate(data))
      .catch(console.error);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('affiliate_email');
    router.push('/afiliados/cadastro');
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-card border-r border-border p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-2">SimpleWork Afiliados</h2>
          {affiliate && (
            <p className="text-sm text-muted-foreground truncate">{affiliate.name}</p>
          )}
        </div>

        <nav className="space-y-2 mb-8">
          <Link href="/afiliados">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link href="/afiliados/meus-leads">
            <Button variant="ghost" className="w-full justify-start">
              <BarChart className="w-4 h-4 mr-2" />
              Meus Leads
            </Button>
          </Link>
          <Link href="/afiliados/comissoes">
            <Button variant="ghost" className="w-full justify-start">
              <BarChart className="w-4 h-4 mr-2" />
              Comissões
            </Button>
          </Link>
        </nav>

        <Button
          variant="outline"
          className="w-full justify-start text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </aside>

      <main className="flex-1" />
    </div>
  );
}
