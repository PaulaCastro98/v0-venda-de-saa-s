'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function AffiliateRegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    cpf: '',
    phone: '',
    pix_key: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError('Você precisa aceitar os termos para continuar');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('/api/affiliates/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao registrar');
      }

      localStorage.setItem('affiliate_email', formData.email);
      localStorage.setItem('affiliate_referral_code', data.referral_code);
      window.location.href = '/afiliados/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao registrar');
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
            <CardTitle className="text-2xl">Cadastro de Afiliado</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">Passo {step} de 2</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
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

                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="João Silva"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      name="cpf"
                      placeholder="12345678900"
                      value={formData.cpf}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button
                    type="button"
                    className="w-full bg-accent hover:bg-accent/90"
                    onClick={() => {
                      if (formData.email && formData.password && formData.name && formData.cpf) {
                        setStep(2);
                      } else {
                        setError('Preencha todos os campos');
                      }
                    }}
                  >
                    Próximo
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="11999999999"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="pix_key">Chave PIX</Label>
                    <Input
                      id="pix_key"
                      name="pix_key"
                      placeholder="seu@email.com ou CPF"
                      value={formData.pix_key}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded border border-border">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => {
                        setAgreedToTerms(e.target.checked);
                        setError('');
                      }}
                      className="mt-1 cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer flex-1">
                      Concordo com as{' '}
                      <Link href="/legal/regras-afiliados" target="_blank" className="text-accent hover:underline font-semibold">
                        Regras do Programa de Afiliados
                      </Link>
                      {' '}da SimpleWork
                    </label>
                  </div>

                  <div className="space-y-2">
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loading}>
                      {loading ? 'Registrando...' : 'Registrar Afiliado'}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setStep(1)}
                    >
                      Voltar
                    </Button>
                  </div>
                </>
              )}

              {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Já tem conta?{' '}
          <Link href="/afiliados/login" className="text-accent hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
