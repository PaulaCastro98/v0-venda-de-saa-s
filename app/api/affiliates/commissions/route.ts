import { NextRequest, NextResponse } from 'next/server';
import { getCommissionsByAffiliateId, getAffiliateStats } from '@/lib/affiliates-db';

export async function GET(req: NextRequest) {
  try {
    const affiliateId = req.nextUrl.searchParams.get('affiliate_id');

    if (!affiliateId) {
      return NextResponse.json(
        { error: 'affiliate_id é obrigatório' },
        { status: 400 }
      );
    }

    const commissions = await getCommissionsByAffiliateId(parseInt(affiliateId));
    const stats = await getAffiliateStats(parseInt(affiliateId));

    return NextResponse.json(
      {
        commissions,
        stats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao buscar comissões:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar comissões' },
      { status: 500 }
    );
  }
}
