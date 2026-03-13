// app/api/admin/commissions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query, withTransaction } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const result = await query(`
      SELECT 
        ac.*,
        a.referral_code,
        u.name as affiliate_name,
        u.email as affiliate_email,
        c.contact_name as client_name,
        pl.name as plan_name
      FROM affiliate_commissions ac
      JOIN affiliates a ON ac.affiliate_id = a.id
      JOIN users u ON a.user_id = u.id
      JOIN clients c ON ac.client_id = c.id
      JOIN plans pl ON c.plan_id = pl.id
      ORDER BY ac.created_at DESC
    `);
    return NextResponse.json({ commissions: result.rows });
  } catch (error) {
    console.error('Erro ao buscar comissões do admin:', error);
    return NextResponse.json({ error: 'Erro ao buscar comissões do admin' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    const updatedCommission = await withTransaction(async (client) => {
      // 1. Busca o status atual da comissão antes de atualizar
      const currentCommissionResult = await client.query(
        'SELECT status, affiliate_id FROM affiliate_commissions WHERE id = $1',
        [id]
      );
      const currentCommission = currentCommissionResult.rows[0];

      if (!currentCommission) {
        throw new Error('Comissão não encontrada');
      }

      const oldStatus = currentCommission.status;
      const affiliateId = currentCommission.affiliate_id;

      // 2. Atualiza a comissão no banco de dados
      // ✅ CORREÇÃO AQUI: Adicionado ::text para forçar a consistência de tipos
      const result = await client.query(
        'UPDATE affiliate_commissions SET status = $1::text, paid_at = CASE WHEN $1::text = $2::text THEN CURRENT_TIMESTAMP ELSE paid_at END, updated_at = NOW() WHERE id = $3 RETURNING *',
        [status, 'paid', id] // 'paid' agora é o segundo parâmetro
      );

      const commission = result.rows[0];

      if (!commission) {
        throw new Error('Comissão não encontrada após atualização');
      }

      // 3. Recalcula o total_earned do afiliado APENAS se o status mudou e afeta o total_earned
      if (status === 'paid' || oldStatus === 'paid') {
        await client.query(
          `UPDATE affiliates 
           SET total_earned = COALESCE((SELECT SUM(commission_amount) FROM affiliate_commissions WHERE affiliate_id = $1 AND status = 'paid'), 0)
           WHERE id = $1`,
          [affiliateId]
        );
      }
      return commission;
    });

    return NextResponse.json({ commission: updatedCommission });
  } catch (error) {
    console.error('Erro ao atualizar comissão no backend:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: `Erro interno ao atualizar comissão: ${errorMessage}` }, { status: 500 });
  }
}