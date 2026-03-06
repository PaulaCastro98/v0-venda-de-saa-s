import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        a.id, 
        a.referral_code, 
        a.status, 
        a.total_earned, 
        a.total_leads, 
        a.total_clients,
        u.name, 
        u.email
      FROM affiliates a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
    `);
    return NextResponse.json({ affiliates: result.rows });
  } catch (error) {
    console.error('Erro ao buscar afiliados:', error);
    return NextResponse.json({ error: 'Erro ao buscar afiliados' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status, blocked_reason } = await req.json();

    const result = await query(
      'UPDATE affiliates SET status = $1, blocked_reason = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [status, blocked_reason || null, id]
    );

    return NextResponse.json({ affiliate: result.rows[0] });
  } catch (error) {
    console.error('Erro ao atualizar afiliado:', error);
    return NextResponse.json({ error: 'Erro ao atualizar afiliado' }, { status: 500 });
  }
}
