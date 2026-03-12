'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, Users, DollarSign, Plus, LogOut } from 'lucide-react';

export function AffiliateSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [affiliate, setAffiliate] = useState<any>(null);

  useEffect(() => {
    const email = localStorage.getItem('affiliate_email');
    if (!email) {
      return;
    }

    fetch(`/api/affiliates/profile?email=${email}`)
      .then((res) => res.json())
      .then((data) => setAffiliate(data))
      .catch(console.error);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('affiliate_email');
    router.push('/afiliados/login');
  };

  const navItems = [
    { href: '/afiliados/dashboard', label: 'Dashboard', icon: Home },
    { href: '/afiliados/novo-lead', label: 'Novo Lead', icon: Plus },
    { href: '/afiliados/meus-leads', label: 'Meus Leads', icon: Users },
    { href: '/afiliados/comissoes', label: 'Comissoes', icon: DollarSign },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border p-6 min-h-screen">
      <div className="mb-8">
        <Link href="/">
          <h2 className="text-xl font-bold text-foreground mb-1">SimpleWork</h2>
        </Link>
        <p className="text-xs text-accent font-medium">Painel de Afiliado</p>
        {affiliate && (
          <p className="text-sm text-muted-foreground truncate mt-2">{affiliate.name}</p>
        )}
      </div>

      <nav className="space-y-1 mb-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button 
                variant={isActive ? 'secondary' : 'ghost'} 
                className={`w-full justify-start ${isActive ? 'bg-accent/10 text-accent' : ''}`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <Button
        variant="outline"
        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={handleLogout}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sair
      </Button>
    </aside>
  );
}
