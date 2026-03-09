// app/api/admin/seed-database/route.ts
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// Definir tipos para os resultados
type ResultDetail = {
  name: string;
  action?: string;
  error?: string;
};

type Results = {
  plans: {
    success: number;
    error: number;
    details: ResultDetail[];
  };
  products: {
    success: number;
    error: number;
    details: ResultDetail[];
  };
};

export async function GET(request: Request) {
  try {
    // Verificar se a solicitação é local
    const url = new URL(request.url);
    if (!url.hostname.includes('localhost') && !url.hostname.includes('127.0.0.1')) {
      return NextResponse.json({ error: 'Esta API só pode ser acessada localmente' }, { status: 403 });
    }

    console.log('Conectando ao banco de dados...');
    const sql = neon(process.env.DATABASE_URL!);
    console.log('Conexão estabelecida!');

    // Dados para inserir
    const plans = [
      { name: 'Essencial', price: 69.90, commission_value: 10.00, active: true },
      { name: 'Profissional', price: 119.90, commission_value: 15.00, active: true },
      { name: 'Empresarial', price: 189.90, commission_value: 20.00, active: true }
    ];

    const products = [
      {
        name: 'CRM Simples',
        slug: 'crm-simples',
        description: 'Gerenciador de relacionamento com cliente',
        category: 'CRM',
        demo_url: 'https://demo.crmsimples.com',
        active: true
      },
      {
        name: 'E-commerce Pro',
        slug: 'ecommerce-pro',
        description: 'Plataforma de loja virtual',
        category: 'E-commerce',
        demo_url: 'https://demo.ecommercepro.com',
        active: true
      },
      {
        name: 'Contabilidade Fácil',
        slug: 'contabilidade-facil',
        description: 'Sistema de contabilidade',
        category: 'Contabilidade',
        demo_url: 'https://demo.contabilidadefacil.com',
        active: true
      },
      {
        name: 'Agenda Profissional',
        slug: 'agenda-profissional',
        description: 'Agendamento de consultas',
        category: 'Agendamento',
        demo_url: 'https://demo.agendaprofissional.com',
        active: true
      },
      {
        name: 'Gestão RH',
        slug: 'gestao-rh',
        description: 'Sistema de recursos humanos',
        category: 'RH',
        demo_url: 'https://demo.gestaorh.com',
        active: true
      },
      {
        name: 'Nota Fiscal Pro',
        slug: 'nota-fiscal-pro',
        description: 'Emissão de nota fiscal eletrônica',
        category: 'Fiscal',
        demo_url: 'https://demo.notafiscalpro.com',
        active: true
      },
      {
        name: 'Estoque Manager',
        slug: 'estoque-manager',
        description: 'Controle de estoque',
        category: 'Estoque',
        demo_url: 'https://demo.estoquemanager.com',
        active: true
      },
      {
        name: 'Marketing Automático',
        slug: 'marketing-automatico',
        description: 'Automação de marketing',
        category: 'Marketing',
        demo_url: 'https://demo.marketingautomatico.com',
        active: true
      },
      {
        name: 'Financeiro Plus',
        slug: 'financeiro-plus',
        description: 'Gestão financeira completa',
        category: 'Financeiro',
        demo_url: 'https://demo.financeiropluis.com',
        active: true
      },
      {
        name: 'Atendimento 24h',
        slug: 'atendimento-24h',
        description: 'Sistema de atendimento ao cliente',
        category: 'Suporte',
        demo_url: 'https://demo.atendimento24h.com',
        active: true
      }
    ];

    // Resultados com tipagem correta
    const results: Results = {
      plans: { success: 0, error: 0, details: [] },
      products: { success: 0, error: 0, details: [] }
    };

    // Inserir planos com tratamento de erros para cada item
    console.log('Inserindo planos...');
    for (const plan of plans) {
      try {
        // Verificar se o plano já existe
        const existingPlan = await sql`
          SELECT id FROM plans WHERE name = ${plan.name}
        `;

        if (existingPlan.length > 0) {
          // Atualizar plano existente
          await sql`
            UPDATE plans 
            SET price = ${plan.price}, commission_value = ${plan.commission_value}, active = ${plan.active}
            WHERE name = ${plan.name}
          `;
          results.plans.success++;
          results.plans.details.push({ name: plan.name, action: 'updated' });
        } else {
          // Inserir novo plano
          await sql`
            INSERT INTO plans (name, price, commission_value, active)
            VALUES (${plan.name}, ${plan.price}, ${plan.commission_value}, ${plan.active})
          `;
          results.plans.success++;
          results.plans.details.push({ name: plan.name, action: 'inserted' });
        }
      } catch (error: any) {
        results.plans.error++;
        results.plans.details.push({ name: plan.name, error: error.message });
        console.error(`Erro ao inserir plano ${plan.name}:`, error);
      }
    }

    // Inserir produtos com tratamento de erros para cada item
    console.log('Inserindo produtos...');
    for (const product of products) {
      try {
        // Verificar se o produto já existe
        const existingProduct = await sql`
          SELECT id FROM products WHERE slug = ${product.slug}
        `;

        if (existingProduct.length > 0) {
          // Atualizar produto existente
          await sql`
            UPDATE products 
            SET name = ${product.name}, 
                description = ${product.description}, 
                category = ${product.category}, 
                demo_url = ${product.demo_url}, 
                active = ${product.active}
            WHERE slug = ${product.slug}
          `;
          results.products.success++;
          results.products.details.push({ name: product.name, action: 'updated' });
        } else {
          // Inserir novo produto
          await sql`
            INSERT INTO products (name, slug, description, category, demo_url, active)
            VALUES (${product.name}, ${product.slug}, ${product.description}, ${product.category}, ${product.demo_url}, ${product.active})
          `;
          results.products.success++;
          results.products.details.push({ name: product.name, action: 'inserted' });
        }
      } catch (error: any) {
        results.products.error++;
        results.products.details.push({ name: product.name, error: error.message });
        console.error(`Erro ao inserir produto ${product.name}:`, error);
      }
    }

    // Verificar resultados
    const plansCount = await sql`SELECT COUNT(*) FROM plans`;
    const productsCount = await sql`SELECT COUNT(*) FROM products`;

    return NextResponse.json({
      success: true,
      message: 'Operação concluída',
      summary: {
        plans: {
          total: plansCount[0].count,
          inserted_or_updated: results.plans.success,
          errors: results.plans.error
        },
        products: {
          total: productsCount[0].count,
          inserted_or_updated: results.products.success,
          errors: results.products.error
        }
      },
      details: results
    });
  } catch (error: any) {
    console.error('Erro na operação:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}