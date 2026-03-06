# Módulo de Afiliados SimpleWork - Documentação Técnica

## Visão Geral
O módulo de afiliados da SimpleWork permite que usuários se registrem como afiliados, indiquem clientes para os sistemas SaaS, e recebam comissões por cada indicação convertida.

## Arquitetura

### Banco de Dados
**Tabelas principais:**
- `users` - Armazena usuários (afiliados e admin)
- `affiliates` - Dados específicos de afiliados (código referência, chave PIX, status)
- `products` - Catálogo de produtos/sistemas
- `plans` - Planos de preço (Essencial R$50, Profissional R$90, Empresarial R$190, Personalizado)
- `leads` - Leads indicados por afiliados
- `clients` - Clientes convertidos
- `client_billing_cycles` - Ciclos de faturamento dos clientes
- `affiliate_commissions` - Histórico de comissões do afiliado

### Fluxo de Indicação
1. Afiliado registra-se e recebe código de referência único
2. Afiliado compartilha seu link de referência
3. Cliente clica no link e acessa a plataforma (com desconto 50% 1º mês)
4. Cliente converte e faz primeira compra
5. Sistema gera comissão de R$10-15 para afiliado
6. Afiliado vê comissão no painel e recebe via PIX

## Endpoints da API

### Afiliados
- `POST /api/affiliates/register` - Registrar novo afiliado
- `GET /api/affiliates/profile?email=X` - Obter dados do afiliado
- `GET /api/affiliates/leads?affiliate_id=X` - Listar leads do afiliado
- `POST /api/affiliates/leads` - Criar novo lead
- `GET /api/affiliates/commissions?affiliate_id=X` - Comissões do afiliado

### Produtos e Planos
- `GET /api/products` - Listar produtos
- `GET /api/plans` - Listar planos

### Admin
- `GET /api/admin/affiliates` - Listar todos os afiliados
- `PATCH /api/admin/affiliates` - Atualizar status de afiliado (bloquear)
- `GET /api/admin/leads?affiliate_id=X` - Leads por afiliado
- `PATCH /api/admin/leads` - Atualizar status de lead
- `GET /api/admin/commissions` - Todas as comissões
- `PATCH /api/admin/commissions` - Marcar comissão como paga

## Páginas

### Público
- `/afiliados` - Página informativa do programa
- `/afiliados/cadastro` - Registro de novo afiliado
- `/afiliados/login` - Login de afiliado

### Painel Afiliado (autenticado)
- `/afiliados` (dashboard) - Visão geral com stats e código de referência
- `/afiliados/meus-leads` - Lista de leads indicados
- `/afiliados/novo-lead` - Adicionar novo lead manualmente
- `/afiliados/comissoes` - Histórico de comissões

### Admin
- `/admin` - Dashboard admin com stats gerais
- `/admin/afiliados` - Gerenciar afiliados (bloquear, ver dados)
- `/admin/leads` - Gerenciar leads (marcar como convertido)
- `/admin/comissoes` - Gerenciar comissões (marcar como pago)

## Funcionalidades Implementadas

✅ Registro de afiliados (2 passos: dados pessoais + chave PIX)
✅ Geração de código de referência único
✅ Criação de leads
✅ Painel afiliado com dashboard
✅ Visualização de leads e comissões
✅ API de admin para gerenciamento
✅ Bloqueio de afiliados suspeitos
✅ Marcação de comissões como pagas
✅ Integração com homepage (botão "Programa de Afiliados")

## Configuração de Produção

### Variáveis de Ambiente
```
DATABASE_URL=postgresql://...
```

### Segurança
- Senhas hasheadas com SHA-256 (MVP - use bcrypt em produção)
- Validação básica de CPF e Email
- Chaves PIX armazenadas de forma segura
- Bloqueio de afiliados com fraude detectada

### Email (Próximas iterações)
- Enviar confirmação de registro
- Notificar sobre nova comissão
- Relatório mensal de ganhos
- Lembrete de pagamento para admin

## Dados de Teste

Após executar os scripts de migration:
- 8 produtos de teste inseridos
- 4 planos criados
- Pronto para registrar afiliados de teste

## Próximas Iterações

- [ ] Integração com Stripe/Pagar.me para pagamento automático de comissões
- [ ] Email notifications
- [ ] Validação real de CPF/CNPJ
- [ ] Autenticação com JWT tokens
- [ ] Dashboard com gráficos de performance
- [ ] Programa de tier (quanto mais vende, maior a comissão)
- [ ] Materiais de marketing prontos para afiliados
- [ ] API publica para integração de terceiros
- [ ] Rastreamento de UTM parameters
- [ ] Webhooks para notificações de conversão
