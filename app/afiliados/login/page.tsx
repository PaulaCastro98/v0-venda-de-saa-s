'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function AffiliateLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('[v0] Attempting login with email:', formData.email);
      
      const response = await fetch('/api/affiliates/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('[v0] Login response status:', response.status);

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      console.log('[v0] Login successful, saving to localStorage');
      localStorage.setItem('affiliate_email', formData.email);
      localStorage.setItem('affiliate_id', String(data.user.id));
      console.log('[v0] Saved email:', localStorage.getItem('affiliate_email'));
      console.log('[v0] Redirecting to dashboard...');
      window.location.href = '/afiliados/dashboard';
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao fazer login';
      console.error('[v0] Login error:', errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            ← Voltar
          </Button>
        </Link>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Login de Afiliado</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">Acesse seu painel</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loading}>
                {loading ? 'Autenticando...' : 'Fazer Login'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Não tem conta?{' '}
          <Link href="/afiliados/cadastro" className="text-accent hover:underline">
            Registre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
