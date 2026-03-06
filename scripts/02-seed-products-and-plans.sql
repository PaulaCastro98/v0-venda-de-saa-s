-- Inserir planos
INSERT INTO plans (name, price, commission_value, active) VALUES
('Essencial', 69.90, 10.00, TRUE),
('Profissional', 119.90, 15.00, TRUE),
('Empresarial', 189.90, 20.00, TRUE);

-- Inserir alguns produtos de exemplo (será necessário migrar os 100+ de lib/products.ts)
INSERT INTO products (name, slug, description, category, demo_url, active) VALUES
('CRM Simples', 'crm-simples', 'Gerenciador de relacionamento com cliente', 'CRM', 'https://demo.crmsimples.com', TRUE),
('E-commerce Pro', 'ecommerce-pro', 'Plataforma de loja virtual', 'E-commerce', 'https://demo.ecommercepro.com', TRUE),
('Contabilidade Fácil', 'contabilidade-facil', 'Sistema de contabilidade', 'Contabilidade', 'https://demo.contabilidadefacil.com', TRUE),
('Agenda Profissional', 'agenda-profissional', 'Agendamento de consultas', 'Agendamento', 'https://demo.agendaprofissional.com', TRUE),
('Gestão RH', 'gestao-rh', 'Sistema de recursos humanos', 'RH', 'https://demo.gestaorh.com', TRUE),
('Nota Fiscal Pro', 'nota-fiscal-pro', 'Emissão de nota fiscal eletrônica', 'Fiscal', 'https://demo.notafiscalpro.com', TRUE),
('Estoque Manager', 'estoque-manager', 'Controle de estoque', 'Estoque', 'https://demo.estoquemanager.com', TRUE),
('Marketing Automático', 'marketing-automatico', 'Automação de marketing', 'Marketing', 'https://demo.marketingautomatico.com', TRUE),
('Financeiro Plus', 'financeiro-plus', 'Gestão financeira completa', 'Financeiro', 'https://demo.financeiropluis.com', TRUE),
('Atendimento 24h', 'atendimento-24h', 'Sistema de atendimento ao cliente', 'Suporte', 'https://demo.atendimento24h.com', TRUE);
