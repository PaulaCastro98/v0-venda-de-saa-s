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
import { ArrowLeft, CheckCircle, MessageCircle, X } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

interface Product {
  id: number;
  name: string;
}

interface Plan {
  id: number;
  name: string;
  price: number;
}

interface CreatedLead {
  id: number;
  client_name: string;
  client_email: string;
  product_name: string;
  plan_name: string;
  plan_price: number;
}

export default function NewLeadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [affiliate, setAffiliate] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdLead, setCreatedLead] = useState<CreatedLead | null>(null);

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
    setError('');
    
    try {
      const selectedProduct = products.find(p => p.id.toString() === formData.product_id);
      const selectedPlan = plans.find(p => p.id.toString() === formData.plan_id);
      
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar lead');
      }

      // Mostrar modal de sucesso
      setCreatedLead({
        id: data.lead.id,
        client_name: formData.client_name,
        client_email: formData.client_email,
        product_name: selectedProduct?.name || '',
        plan_name: selectedPlan?.name || '',
        plan_price: selectedPlan?.price || 0,
      });
      setShowSuccessModal(true);
      
      // Limpar formulário
      setFormData({
        client_name: '',
        client_email: '',
        product_id: '',
        plan_id: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar lead');
    } finally {
      setLoading(false);
    }
  };

  const buildLeadWhatsAppMessage = () => {
    if (!createdLead || !affiliate) return '';
    return `Olá! Sou ${affiliate.name}, afiliado SimpleWork (código: ${affiliate.referral_code}).

Tenho uma indicação para vocês!

*Dados do Lead:*
- Nome: ${createdLead.client_name}
- Email: ${createdLead.client_email}
- Produto: ${createdLead.product_name}
- Plano: ${createdLead.plan_name} (R$ ${parseFloat(String(createdLead.plan_price)).toFixed(2)}/mês)

Aguardo confirmação da conversão!`;
  };

  const handleSendWhatsApp = () => {
    const message = buildLeadWhatsAppMessage();
    const whatsappUrl = getWhatsAppLink(message);
    window.open(whatsappUrl, '_blank');
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setCreatedLead(null);
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

      {/* Modal de Sucesso */}
      {showSuccessModal && createdLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Lead Adicionado!</h3>
              <p className="text-muted-foreground mt-2">Seu lead foi cadastrado com sucesso.</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-6 text-sm">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Cliente:</span>
                <span className="font-medium text-foreground">{createdLead.client_name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium text-foreground">{createdLead.client_email}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Produto:</span>
                <span className="font-medium text-foreground">{createdLead.product_name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Plano:</span>
                <span className="font-medium text-foreground">{createdLead.plan_name}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-semibold text-amber-600">Aguardando Aprovacao</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleSendWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Enviar para WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/afiliados/meus-leads')}
                className="w-full"
              >
                Ver Meus Leads
              </Button>
              <Button
                variant="ghost"
                onClick={handleCloseModal}
                className="w-full"
              >
                Adicionar Outro Lead
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
