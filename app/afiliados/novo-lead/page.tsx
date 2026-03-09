'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AffiliateSidebar } from '@/components/affiliate-sidebar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Product {
  id: number;
  name: string;
}

interface Plan {
  id: number;
  name: string;
  price: number;
}

export default function NewLeadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [affiliate, setAffiliate] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);

  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    product_id: '',
    plan_id: '',
  });

  useEffect(() => {
    const email = localStorage.getItem('affiliate_email');
    if (!email) {
      router.push('/afiliados/login');
      return;
    }

    fetch(`/api/affiliates/profile?email=${email}`)
      .then((res) => res.json())
      .then((data) => setAffiliate(data))
      .catch(console.error);

    // Fetch products and plans
    fetch(`/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => {});

    fetch(`/api/plans`)
      .then((res) => res.json())
      .then((data) => setPlans(data.plans || []))
      .catch(() => {});
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!affiliate) return;

    setLoading(true);
    try {
      const response = await fetch('/api/affiliates/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          affiliate_id: affiliate.id,
          product_id: parseInt(formData.product_id),
          plan_id: parseInt(formData.plan_id),
          client_email: formData.client_email,
          client_name: formData.client_name,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar lead');
      }

      router.push('/afiliados/meus-leads');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AffiliateSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <Link href="/afiliados/meus-leads">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>

          <Card>
            <CardHeader>
              <CardTitle>Adicionar Novo Lead</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="client_name">Nome do Cliente</Label>
                  <Input
                    id="client_name"
                    name="client_name"
                    placeholder="João Silva"
                    value={formData.client_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="client_email">Email do Cliente</Label>
                  <Input
                    id="client_email"
                    name="client_email"
                    type="email"
                    placeholder="cliente@email.com"
                    value={formData.client_email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="product_id">Produto</Label>
                  <Select value={formData.product_id} onValueChange={(value) => handleSelectChange('product_id', value)}>
                    <SelectTrigger id="product_id">
                      <SelectValue placeholder="Selecione um produto" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="plan_id">Plano</Label>
                  <Select value={formData.plan_id} onValueChange={(value) => handleSelectChange('plan_id', value)}>
                    <SelectTrigger id="plan_id">
                      <SelectValue placeholder="Selecione um plano" />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id.toString()}>
                          {plan.name} - R$ {parseFloat(String(plan.price)).toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}

                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loading}>
                  {loading ? 'Adicionando...' : 'Adicionar Lead'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
