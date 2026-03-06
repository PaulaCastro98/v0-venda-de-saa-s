import { NextRequest, NextResponse } from 'next/server';
import { createUser, generateReferralCode, hashPassword } from '@/lib/auth';
import { createAffiliate } from '@/lib/affiliates-db';

export async function POST(req: NextRequest) {
  try {
    const { email, name, cpf, phone, password, pix_key } = await req.json();

    if (!email || !name || !cpf || !password || !pix_key) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: email, name, cpf, password, pix_key' },
        { status: 400 }
      );
    }

    const passwordHash = hashPassword(password);
    const user = await createUser(email, name, cpf, phone || '', passwordHash);
    
    const referralCode = generateReferralCode();
    const affiliate = await createAffiliate(user.id, referralCode, pix_key);

    return NextResponse.json(
      {
        message: 'Afiliado registrado com sucesso',
        affiliate_id: affiliate.id,
        referral_code: affiliate.referral_code,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro no registro:', error);
    return NextResponse.json(
      { error: 'Erro ao registrar afiliado' },
      { status: 500 }
    );
  }
}
