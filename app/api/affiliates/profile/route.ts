import { NextRequest, NextResponse } from 'next/server';
import { getAffiliateByUserId } from '@/lib/affiliates-db';
import { getUserByEmail } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'email é obrigatório' },
        { status: 400 }
      );
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const affiliate = await getAffiliateByUserId(user.id);
    if (!affiliate) {
      return NextResponse.json(
        { error: 'Afiliado não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        id: affiliate.id,
        email: user.email,
        name: user.name,
        referral_code: affiliate.referral_code,
        pix_key: affiliate.pix_key,
        status: affiliate.status,
        total_earned: affiliate.total_earned,
        total_leads: affiliate.total_leads,
        total_clients: affiliate.total_clients,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar perfil' },
      { status: 500 }
    );
  }
}
