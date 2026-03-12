// app/api/affiliates/register/route.ts
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { hashPassword, generateReferralCode } from '@/lib/auth'; // ✅ importar do auth.ts

const sql = neon(process.env.DATABASE_URL!);

// ❌ REMOVER ISSO:
// import { createHash } from 'crypto';
// function hashPassword(password: string): string {
//   return createHash('md5').update(password).digest('hex');
// }

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email || !body.password || !body.name || !body.cpf || !body.phone || !body.pix_key) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${body.email}
    `;
    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'Este email já está cadastrado' }, { status: 409 });
    }

    const existingCpf = await sql`
      SELECT id FROM affiliates WHERE cpf = ${body.cpf}
    `;
    if (existingCpf.length > 0) {
      return NextResponse.json({ error: 'Este CPF já está cadastrado' }, { status: 409 });
    }

    // ✅ Agora usando SHA256 igual ao login
    const hashedPassword = hashPassword(body.password);
    const referralCode = generateReferralCode();

    let userId = null;

    try {
      const userResult = await sql`
        INSERT INTO users (name, email, password_hash, created_at, updated_at)
        VALUES (${body.name}, ${body.email}, ${hashedPassword}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id
      `;

      if (!userResult || userResult.length === 0) {
        return NextResponse.json({ error: 'Falha ao criar usuário' }, { status: 500 });
      }

      userId = userResult[0].id;

      const affiliateResult = await sql`
        INSERT INTO affiliates (
          user_id, name, email, password, full_name, cpf,
          whatsapp, pix_key, referral_code, status, created_at
        )
        VALUES (
          ${userId}, ${body.name}, ${body.email}, ${hashedPassword},
          ${body.name}, ${body.cpf}, ${body.phone}, ${body.pix_key},
          ${referralCode}, 'pending', CURRENT_TIMESTAMP
        )
        RETURNING id, referral_code
      `;

      return NextResponse.json({
        success: true,
        message: 'Cadastro realizado com sucesso! Seu cadastro está em análise.',
        userId: userId,
        affiliateId: affiliateResult[0].id,
        referral_code: affiliateResult[0].referral_code
      }, { status: 201 });

    } catch (error: any) {
      if (userId) {
        await sql`DELETE FROM users WHERE id = ${userId}`;
      }
      return NextResponse.json({ error: 'Erro ao registrar afiliado: ' + error.message }, { status: 500 });
    }

  } catch (error: any) {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}