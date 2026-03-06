import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        ac.*,
        a.referral_code,
        u.name as affiliate_name,
        u.email as affiliate_email,
        c.name as client_name,
        pl.name as plan_name
      FROM affiliate_commissions ac
      JOIN affiliates a ON ac.affiliate_id = a.id
      JOIN users u ON a.user_id = u.id
      JOIN clients c ON ac.client_id = c.id
      JOIN plans pl ON ac.plan_id = pl.id
      ORDER BY ac.created_at DESC
    `);
    return NextResponse.json({ commissions: result.rows });
  } catch (error) {
    console.error('Erro ao buscar comissões:', error);
    return NextResponse.json({ error: 'Erro ao buscar comissões' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    const result = await query(
      'UPDATE affiliate_commissions SET status = $1, paid_at = CASE WHEN $1 = $2 THEN CURRENT_TIMESTAMP ELSE paid_at END WHERE id = $3 RETURNING *',
      [status, 'paid', id]
    );

    return NextResponse.json({ commission: result.rows[0] });
  } catch (error) {
    console.error('Erro ao atualizar comissão:', error);
    return NextResponse.json({ error: 'Erro ao atualizar comissão' }, { status: 500 });
  }
}
