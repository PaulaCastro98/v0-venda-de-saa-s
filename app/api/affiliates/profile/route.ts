import { NextRequest, NextResponse } from 'next/server';
import { getAffiliateByUserId, getAffiliateStats } from '@/lib/affiliates-db';
import { getUserByEmail } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');
    console.log('[v0] Profile request for email:', email);

    if (!email) {
      console.log('[v0] Missing email parameter');
      return NextResponse.json(
        { error: 'email é obrigatório' },
        { status: 400 }
      );
    }

    console.log('[v0] Looking up user by email...');
    const user = await getUserByEmail(email);
    if (!user) {
      console.log('[v0] User not found for email:', email);
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    console.log('[v0] Looking up affiliate by user_id:', user.id);
    const affiliate = await getAffiliateByUserId(user.id);
    if (!affiliate) {
      console.log('[v0] Affiliate not found for user_id:', user.id);
      return NextResponse.json(
        { error: 'Afiliado não encontrado' },
        { status: 404 }
      );
    }

    // ✅ Buscar stats em tempo real
    console.log('[v0] Fetching real-time stats for affiliate:', affiliate.id);
    const stats = await getAffiliateStats(affiliate.id);

    console.log('[v0] Profile found, returning data');
    return NextResponse.json(
      {
        id: affiliate.id,
        email: user.email,
        name: user.name,
        referral_code: affiliate.referral_code,
        pix_key: affiliate.pix_key,
        status: affiliate.status,
        // ✅ Dados calculados em tempo real
        total_earned: stats?.total_paid ?? 0,
        total_leads: stats?.total_leads ?? 0,
        total_clients: stats?.converted_leads ?? 0,
        pending_commissions: stats?.pending_commissions ?? 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Erro ao buscar perfil:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: `Erro ao buscar perfil: ${errorMessage}` },
      { status: 500 }
    );
  }
}