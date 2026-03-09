import { NextRequest, NextResponse } from 'next/server';
import { createUser, generateReferralCode, hashPassword, getUserByEmail } from '@/lib/auth';
import { createAffiliate } from '@/lib/affiliates-db';

export async function POST(req: NextRequest) {
  try {
    console.log('[v0] DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
    
    const body = await req.json();
    console.log('[v0] Received registration data:', { ...body, password: '***' });
    
    const { email, name, cpf, phone, password, pix_key } = body;

    if (!email || !name || !cpf || !password || !pix_key) {
      console.log('[v0] Missing required fields');
      return NextResponse.json(
        { error: 'Campos obrigatórios: email, name, cpf, password, pix_key' },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('[v0] Checking if user exists...');
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      console.log('[v0] User already exists:', email);
      return NextResponse.json(
        { error: 'Este email já está cadastrado' },
        { status: 400 }
      );
    }
    console.log('[v0] User does not exist, proceeding with creation');

    const passwordHash = hashPassword(password);
    console.log('[v0] Creating user...');
    const user = await createUser(email, name, cpf, phone || '', passwordHash);
    console.log('[v0] User created with ID:', user?.id);
    
    if (!user) {
      throw new Error('Failed to create user');
    }
    
    const referralCode = generateReferralCode();
    console.log('[v0] Creating affiliate with code:', referralCode);
    const affiliate = await createAffiliate(user.id, referralCode, pix_key);
    console.log('[v0] Affiliate created with ID:', affiliate?.id);

    return NextResponse.json(
      {
        message: 'Afiliado registrado com sucesso',
        affiliate_id: affiliate.id,
        referral_code: affiliate.referral_code,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Error in affiliate registration:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('[v0] Stack trace:', error instanceof Error ? error.stack : 'N/A');
    return NextResponse.json(
      { error: `Erro ao registrar afiliado: ${errorMessage}` },
      { status: 500 }
    );
  }
}
