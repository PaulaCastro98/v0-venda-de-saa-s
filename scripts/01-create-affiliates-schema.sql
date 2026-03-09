// scripts/implement-full-schema.js
const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error('Erro: A variável de ambiente DATABASE_URL não está definida');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function implementFullSchema() {
  try {
    console.log('Implementando esquema completo do banco de dados...');

    // Criar tabela de usuários
    console.log('Criando tabela users...');
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        cpf VARCHAR(14),
        phone VARCHAR(20),
        pix_key VARCHAR(255)
      )
    `;

    // Criar tabela de planos
    console.log('Criando tabela plans...');
    await sql`
      CREATE TABLE IF NOT EXISTS plans (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        commission_value NUMERIC(10, 2) NOT NULL,
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Criar tabela de produtos
    console.log('Criando tabela products...');
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        category VARCHAR(100),
        demo_url VARCHAR(500),
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Criar tabela de afiliados
    console.log('Criando tabela affiliates...');
    await sql`
      CREATE TABLE IF NOT EXISTS affiliates (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        full_name VARCHAR(255) NOT NULL,
        cpf VARCHAR(14) UNIQUE NOT NULL,
        whatsapp VARCHAR(20) NOT NULL,
        pix_key VARCHAR(255) NOT NULL,
        referral_code VARCHAR(20) UNIQUE,
        status VARCHAR(20) DEFAULT 'active',
        blocked_reason TEXT,
        total_earned NUMERIC(10, 2) DEFAULT 0,
        total_leads INTEGER DEFAULT 0,
        total_clients INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    // Criar tabela de leads (indicações)
    console.log('Criando tabela leads...');
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        affiliate_id INTEGER NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        cnpj VARCHAR(18),
        contact_name VARCHAR(255) NOT NULL,
        contact_email VARCHAR(255) NOT NULL,
        contact_whatsapp VARCHAR(20) NOT NULL,
        product_id INTEGER NOT NULL,
        plan_id INTEGER NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (affiliate_id) REFERENCES affiliates(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (plan_id) REFERENCES plans(id)
      )
    `;

    // Criar tabela de clientes
    console.log('Criando tabela clients...');
    await sql`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        affiliate_id INTEGER,
        lead_id INTEGER,
        company_name VARCHAR(255) NOT NULL,
        cnpj VARCHAR(18),
        contact_name VARCHAR(255) NOT NULL,
        contact_email VARCHAR(255) NOT NULL,
        contact_whatsapp VARCHAR(20) NOT NULL,
        product_id INTEGER NOT NULL,
        plan_id INTEGER NOT NULL,
        domain VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (affiliate_id) REFERENCES affiliates(id) ON DELETE SET NULL,
        FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (plan_id) REFERENCES plans(id)
      )
    `;

    // Criar tabela de ciclos de faturamento
    console.log('Criando tabela client_billing_cycles...');
    await sql`
      CREATE TABLE IF NOT EXISTS client_billing_cycles (
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL,
        billing_period VARCHAR(7),
        amount_charged NUMERIC(10, 2) NOT NULL,
        discount_applied NUMERIC(10, 2) DEFAULT 0,
        payment_status VARCHAR(50) DEFAULT 'pending',
        payment_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
      )
    `;

    // Criar tabela de comissões
    console.log('Criando tabela affiliate_commissions...');
    await sql`
      CREATE TABLE IF NOT EXISTS affiliate_commissions (
        id SERIAL PRIMARY KEY,
        affiliate_id INTEGER NOT NULL,
        client_id INTEGER NOT NULL,
        billing_cycle_id INTEGER NOT NULL,
        commission_amount NUMERIC(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        paid_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (affiliate_id) REFERENCES affiliates(id) ON DELETE CASCADE,
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
        FOREIGN KEY (billing_cycle_id) REFERENCES client_billing_cycles(id) ON DELETE CASCADE
      )
    `;

    // Criar índices para performance
    console.log('Criando índices...');
    await sql`CREATE INDEX IF NOT EXISTS idx_affiliates_user_id ON affiliates(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_affiliates_status ON affiliates(status)`;
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS affiliates_cpf_unique ON affiliates(cpf)`;
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS affiliates_email_key ON affiliates(email)`;
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS affiliates_referral_code_key ON affiliates(referral_code)`;
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS affiliates_user_id_unique ON affiliates(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_affiliate_id ON leads(affiliate_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_clients_affiliate_id ON clients(affiliate_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_billing_cycles_client_id ON client_billing_cycles(client_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_billing_cycles_billing_period ON client_billing_cycles(billing_period)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_commissions_affiliate_id ON affiliate_commissions(affiliate_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_commissions_status ON affiliate_commissions(status)`;

    console.log('Esquema completo implementado com sucesso!');

    // Inserir dados iniciais para planos
    console.log('Inserindo planos iniciais...');
    await sql`
      INSERT INTO plans (name, price, commission_value, active)
      VALUES 
        ('Essencial', 69.90, 10.00, TRUE),
        ('Profissional', 119.90, 15.00, TRUE),
        ('Empresarial', 189.90, 20.00, TRUE)
      ON CONFLICT (name) DO UPDATE 
      SET price = EXCLUDED.price, 
          commission_value = EXCLUDED.commission_value
    `;

    // Inserir dados iniciais para produtos
    console.log('Inserindo produtos iniciais...');
    await sql`
      INSERT INTO products (name, slug, description, category, demo_url, active)
      VALUES
        ('CRM Simples', 'crm-simples', 'Gerenciador de relacionamento com cliente', 'CRM', 'https://demo.crmsimples.com', TRUE),
        ('E-commerce Pro', 'ecommerce-pro', 'Plataforma de loja virtual', 'E-commerce', 'https://demo.ecommercepro.com', TRUE),
        ('Contabilidade Fácil', 'contabilidade-facil', 'Sistema de contabilidade', 'Contabilidade', 'https://demo.contabilidadefacil.com', TRUE),
        ('Agenda Profissional', 'agenda-profissional', 'Agendamento de consultas', 'Agendamento', 'https://demo.agendaprofissional.com', TRUE),
        ('Gestão RH', 'gestao-rh', 'Sistema de recursos humanos', 'RH', 'https://demo.gestaorh.com', TRUE),
        ('Nota Fiscal Pro', 'nota-fiscal-pro', 'Emissão de nota fiscal eletrônica', 'Fiscal', 'https://demo.notafiscalpro.com', TRUE),
        ('Estoque Manager', 'estoque-manager', 'Controle de estoque', 'Estoque', 'https://demo.estoquemanager.com', TRUE),
        ('Marketing Automático', 'marketing-automatico', 'Automação de marketing', 'Marketing', 'https://demo.marketingautomatico.com', TRUE),
        ('Financeiro Plus', 'financeiro-plus', 'Gestão financeira completa', 'Financeiro', 'https://demo.financeiropluis.com', TRUE),
        ('Atendimento 24h', 'atendimento-24h', 'Sistema de atendimento ao cliente', 'Suporte', 'https://demo.atendimento24h.com', TRUE)
      ON CONFLICT (slug) DO UPDATE 
      SET name = EXCLUDED.name,
          description = EXCLUDED.description,
          category = EXCLUDED.category,
          demo_url = EXCLUDED.demo_url
    `;

    // Verificar as tabelas criadas
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    console.log('Tabelas criadas:');
    tables.forEach(table => {
      console.log(`- ${table.table_name}`);
    });

    // Verificar contagem de registros em cada tabela
    console.log('\nContagem de registros:');

    const plansCount = await sql`SELECT COUNT(*) FROM plans`;
    console.log(`- Plans: ${plansCount[0].count} registros`);

    const productsCount = await sql`SELECT COUNT(*) FROM products`;
    console.log(`- Products: ${productsCount[0].count} registros`);

    const usersCount = await sql`SELECT COUNT(*) FROM users`;
    console.log(`- Users: ${usersCount[0].count} registros`);

    const affiliatesCount = await sql`SELECT COUNT(*) FROM affiliates`;
    console.log(`- Affiliates: ${affiliatesCount[0].count} registros`);

  } catch (error) {
    console.error('Erro ao implementar esquema:', error);
    throw error;
  }
}

implementFullSchema()
  .then(() => {
    console.log('Script finalizado com sucesso.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Erro no script:', error);
    process.exit(1);
  });