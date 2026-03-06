import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Starting database seeding...');

    // Seed products
    const productsInsert = `
      INSERT INTO products (name, slug, description, category) VALUES
      ('Gestão Comercial', 'gestao-comercial', 'Sistema completo de gestão de vendas e clientes', 'Varejo'),
      ('Gestão de Estoque', 'gestao-estoque', 'Controle total de inventário e movimentações', 'Logística'),
      ('Agendamentos', 'agendamentos', 'Sistema de agendamentos para serviços', 'Serviços'),
      ('CRM Simples', 'crm-simples', 'Gestão de relacionamento com clientes', 'CRM'),
      ('Financeiro', 'financeiro', 'Controle completo de receitas e despesas', 'Financeiro'),
      ('RH e Folha', 'rh-folha', 'Gestão de recursos humanos e folha de pagamento', 'RH'),
      ('Marketplace', 'marketplace', 'Plataforma de vendas online', 'E-commerce'),
      ('Delivery', 'delivery', 'Sistema para gestão de delivery', 'Delivery')
      ON CONFLICT (slug) DO NOTHING
    `;
    await client.query(productsInsert);
    console.log('✓ Seeded products');

    // Seed plans
    const plansInsert = `
      INSERT INTO plans (name, price, commission, first_month_discount) VALUES
      ('Essencial', 69.90, 10.00, 0.5),
      ('Profissional', 149.90, 15.00, 0.5),
      ('Empresarial', 600.00, 25.00, 0.5),
      ('Personalizado', 0.00, 0.00, 0.0)
      ON CONFLICT DO NOTHING
    `;
    await client.query(plansInsert);
    console.log('✓ Seeded plans');

    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
