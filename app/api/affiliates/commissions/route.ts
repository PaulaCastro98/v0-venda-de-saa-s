// app/api/affiliates/commissions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const affiliateId = req.nextUrl.searchParams.get('affiliate_id');

    if (!affiliateId) {
      return NextResponse.json(
        { error: 'affiliate_id é obrigatório' },
        { status: 400 }
      );
    }

    // 1. Buscar todas as comissões para o afiliado
    const commissionsResult = await query(
      `SELECT 
        ac.id,
        ac.commission_amount,
        ac.status,
        ac.created_at,
        c.contact_name as client_name,
        pl.name as plan_name
      FROM affiliate_commissions ac
      JOIN clients c ON ac.client_id = c.id
      JOIN plans pl ON c.plan_id = pl.id
      WHERE ac.affiliate_id = $1
      ORDER BY ac.created_at DESC`,
      [affiliateId]
    );

    // 2. Calcular os stats (total_paid e pending_commissions)
    const statsResult = await query(
      `SELECT 
        COALESCE(SUM(CASE WHEN status = 'paid' THEN commission_amount ELSE 0 END), 0) as total_paid,
        COALESCE(SUM(CASE WHEN status = 'approved' THEN commission_amount ELSE 0 END), 0) as pending_commissions
      FROM affiliate_commissions
      WHERE affiliate_id = $1`,
      [affiliateId]
    );

    const stats = statsResult.rows[0];

    return NextResponse.json({
      commissions: commissionsResult.rows,
      stats: {
        total_paid: parseFloat(stats.total_paid || '0'),
        pending_commissions: parseFloat(stats.pending_commissions || '0'),
      },
    });
  } catch (error) {
    console.error('Erro ao buscar comissões do afiliado:', error);
    return NextResponse.json({ error: 'Erro ao buscar comissões do afiliado' }, { status: 500 });
  }
}