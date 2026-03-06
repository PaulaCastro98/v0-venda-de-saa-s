import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const affiliateId = req.nextUrl.searchParams.get('affiliate_id');

    const result = await query(
      `SELECT 
        l.*, 
        p.name as product_name, 
        pl.name as plan_name,
        c.id as client_id,
        c.status as client_status
      FROM leads l
      JOIN products p ON l.product_id = p.id
      JOIN plans pl ON l.plan_id = pl.id
      LEFT JOIN clients c ON l.id = c.lead_id
      WHERE l.affiliate_id = $1
      ORDER BY l.created_at DESC`,
      [affiliateId]
    );

    return NextResponse.json({ leads: result.rows });
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    return NextResponse.json({ error: 'Erro ao buscar leads' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    const result = await query(
      'UPDATE leads SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    return NextResponse.json({ lead: result.rows[0] });
  } catch (error) {
    console.error('Erro ao atualizar lead:', error);
    return NextResponse.json({ error: 'Erro ao atualizar lead' }, { status: 500 });
  }
}
