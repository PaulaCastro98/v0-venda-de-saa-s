// app/api/admin/leads/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query, withTransaction } from '@/lib/db'; // Importa withTransaction

// Função auxiliar para buscar o valor da comissão de um plano
async function getCommissionValueForPlan(client: any, planId: number): Promise<number> {
  const planResult = await client.query('SELECT commission_value FROM plans WHERE id = $1', [planId]);
  if (planResult.rows.length === 0) {
    throw new Error(`Plano com ID ${planId} não encontrado.`);
  }
  return parseFloat(planResult.rows[0].commission_value);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const affiliateId = searchParams.get('affiliate_id');

    let leadsQuery = `
      SELECT
        l.id,
        l.affiliate_id,
        l.company_name,
        l.cnpj,
        l.contact_name as client_name,
        l.contact_email as client_email,
        l.contact_whatsapp,
        l.product_id,
        p.name as product_name,
        l.plan_id,
        pl.name as plan_name,
        l.status,
        l.created_at,
        l.updated_at
      FROM leads l
      JOIN products p ON l.product_id = p.id
      JOIN plans pl ON l.plan_id = pl.id
    `;
    const queryParams: (string | number)[] = [];

    if (affiliateId) {
      leadsQuery += ' WHERE l.affiliate_id = $1';
      queryParams.push(parseInt(affiliateId));
    }

    leadsQuery += ' ORDER BY l.created_at DESC';

    const result = await query(leadsQuery, queryParams);
    return NextResponse.json({ leads: result.rows });
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    return NextResponse.json({ error: 'Erro ao buscar leads' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id: leadId, status: newStatus } = await req.json();

    const updatedLead = await withTransaction(async (client) => {
      // 1. Buscar detalhes do lead atual
      const currentLeadResult = await client.query(
        `SELECT
          id, affiliate_id, contact_name, contact_email, contact_whatsapp,
          product_id, plan_id, status, company_name, cnpj
         FROM leads WHERE id = $1`,
        [leadId]
      );
      const currentLead = currentLeadResult.rows[0];

      if (!currentLead) {
        throw new Error('Lead não encontrado.');
      }

      const oldStatus = currentLead.status;

      // 2. Atualizar o status do lead
      const updateLeadResult = await client.query(
        'UPDATE leads SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        [newStatus, leadId]
      );
      const lead = updateLeadResult.rows[0];

      if (!lead) {
        throw new Error('Falha ao atualizar o status do lead.');
      }

      // 3. Lógica de conversão para cliente e comissão
      if (newStatus === 'converted' && oldStatus !== 'converted') {
        let clientId: number;

        // Verificar se já existe um cliente com este email ou lead_id
        const existingClientResult = await client.query(
          'SELECT id FROM clients WHERE lead_id = $1 OR contact_email = $2',
          [leadId, currentLead.contact_email]
        );

        if (existingClientResult.rows.length > 0) {
          // Cliente já existe, usar o ID existente
          clientId = existingClientResult.rows[0].id;
          // Opcional: Atualizar dados do cliente existente se necessário
          await client.query(
            `UPDATE clients SET
               affiliate_id = $1, company_name = $2, cnpj = $3,
               contact_name = $4, contact_whatsapp = $5, product_id = $6,
               plan_id = $7, updated_at = CURRENT_TIMESTAMP
             WHERE id = $8`,
            [
              currentLead.affiliate_id,
              currentLead.company_name,
              currentLead.cnpj,
              currentLead.contact_name,
              currentLead.contact_whatsapp,
              currentLead.product_id,
              currentLead.plan_id,
              clientId,
            ]
          );
        } else {
          // Cliente não existe, criar um novo
          const createClientResult = await client.query(
            `INSERT INTO clients (
               affiliate_id, lead_id, company_name, cnpj, contact_name,
               contact_email, contact_whatsapp, product_id, plan_id, status,
               created_at, updated_at
             ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
             RETURNING id`,
            [
              currentLead.affiliate_id,
              currentLead.id, // lead_id
              currentLead.company_name,
              currentLead.cnpj,
              currentLead.contact_name,
              currentLead.contact_email,
              currentLead.contact_whatsapp,
              currentLead.product_id,
              currentLead.plan_id,
              'active', // Status inicial do cliente
            ]
          );
          clientId = createClientResult.rows[0].id;
        }

        // Obter o valor da comissão do plano
        const commissionValue = await getCommissionValueForPlan(client, currentLead.plan_id);

        // Inserir a comissão
        await client.query(
          `INSERT INTO affiliate_commissions (
             affiliate_id, client_id, commission_amount, status, created_at, updated_at
           ) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
          [currentLead.affiliate_id, clientId, commissionValue, 'pending'] // Status inicial da comissão
        );

        // Atualizar total_leads e total_clients do afiliado
        // Incrementa total_clients apenas se o cliente foi realmente criado agora
        // E total_leads sempre que um lead é convertido
        await client.query(
          `UPDATE affiliates
           SET
             total_clients = COALESCE(total_clients, 0) + 1,
             total_leads = COALESCE(total_leads, 0) + 1
           WHERE id = $1`,
          [currentLead.affiliate_id]
        );
      }

      return lead; // Retorna o lead atualizado
    });

    return NextResponse.json({ lead: updatedLead });
  } catch (error) {
    console.error('Erro ao atualizar lead no backend:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: `Erro interno ao atualizar lead: ${errorMessage}` }, { status: 500 });
  }
}