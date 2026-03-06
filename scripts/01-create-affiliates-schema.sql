-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de afiliados
CREATE TABLE IF NOT EXISTS affiliates (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  whatsapp VARCHAR(20) NOT NULL,
  pix_key VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, blocked
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Criar tabela de produtos
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
);

-- Criar tabela de planos
CREATE TABLE IF NOT EXISTS plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  commission_value DECIMAL(10, 2) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de leads (indicações)
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
  status VARCHAR(50) DEFAULT 'pending', -- pending, converted, rejected, contacted
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (affiliate_id) REFERENCES affiliates(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (plan_id) REFERENCES plans(id)
);

-- Criar tabela de clientes
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
  status VARCHAR(50) DEFAULT 'pending', -- pending, active, delinquent, cancelled
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (affiliate_id) REFERENCES affiliates(id) ON DELETE SET NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (plan_id) REFERENCES plans(id)
);

-- Criar tabela de ciclos de faturamento
CREATE TABLE IF NOT EXISTS client_billing_cycles (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL,
  billing_period VARCHAR(7), -- YYYY-MM
  amount_charged DECIMAL(10, 2) NOT NULL,
  discount_applied DECIMAL(10, 2) DEFAULT 0, -- 50% desconto 1º mês com afiliado
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, overdue
  payment_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- Criar tabela de comissões
CREATE TABLE IF NOT EXISTS affiliate_commissions (
  id SERIAL PRIMARY KEY,
  affiliate_id INTEGER NOT NULL,
  client_id INTEGER NOT NULL,
  billing_cycle_id INTEGER NOT NULL,
  commission_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, paid
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (affiliate_id) REFERENCES affiliates(id) ON DELETE CASCADE,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (billing_cycle_id) REFERENCES client_billing_cycles(id) ON DELETE CASCADE
);

-- Criar índices para performance
CREATE INDEX idx_affiliates_user_id ON affiliates(user_id);
CREATE INDEX idx_affiliates_status ON affiliates(status);
CREATE INDEX idx_leads_affiliate_id ON leads(affiliate_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_clients_affiliate_id ON clients(affiliate_id);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_billing_cycles_client_id ON client_billing_cycles(client_id);
CREATE INDEX idx_billing_cycles_billing_period ON client_billing_cycles(billing_period);
CREATE INDEX idx_commissions_affiliate_id ON affiliate_commissions(affiliate_id);
CREATE INDEX idx_commissions_status ON affiliate_commissions(status);
