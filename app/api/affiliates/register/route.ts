// app/api/affiliates/register/route.ts
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { createHash } from 'crypto';

const sql = neon(process.env.DATABASE_URL!);

// Função simples para hash MD5 (para desenvolvimento)
function hashPassword(password: string): string {
  return createHash('md5').update(password).digest('hex');
}

export async function POST(request: Request) {
  try {
    // Obter dados do corpo da requisição
    const body = await request.json();

    console.log('Dados recebidos:', {
      email: body.email,
      name: body.name,
      cpf: body.cpf,
      phone: body.phone,
      pix_key: body.pix_key
    });

    // Validação básica
    if (!body.email || !body.password || !body.name || !body.cpf || !body.phone || !body.pix_key) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    // Verificar se o usuário já existe
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${body.email}
    `;

    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'Este email já está cadastrado' }, { status: 409 });
    }

    // Verificar se o CPF já está cadastrado
    const existingCpf = await sql`
      SELECT id FROM affiliates WHERE cpf = ${body.cpf}
    `;

    if (existingCpf.length > 0) {
      return NextResponse.json({ error: 'Este CPF já está cadastrado' }, { status: 409 });
    }

    // Hash da senha
    const hashedPassword = hashPassword(body.password);

    // Gerar código de referência aleatório
    const referralCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Variável para armazenar o ID do usuário
    let userId = null;

    try {
      // 1. Inserir na tabela users
      const userResult = await sql`
        INSERT INTO users (
          name, 
          email, 
          password_hash,
          created_at, 
          updated_at
        )
        VALUES (
          ${body.name}, 
          ${body.email}, 
          ${hashedPassword},
          CURRENT_TIMESTAMP, 
          CURRENT_TIMESTAMP
        )
        RETURNING id
      `;

      if (!userResult || userResult.length === 0) {
        return NextResponse.json({ error: 'Falha ao criar usuário' }, { status: 500 });
      }

      userId = userResult[0].id;
      console.log(`Usuário criado com ID: ${userId}`);

      // 2. Inserir na tabela affiliates
      const affiliateResult = await sql`
        INSERT INTO affiliates (
          user_id,
          name,
          email,
          password,
          full_name,
          cpf,
          whatsapp,
          pix_key,
          referral_code,
          status,
          created_at
        )
        VALUES (
          ${userId},
          ${body.name},
          ${body.email},
          ${hashedPassword},
          ${body.name},
          ${body.cpf},
          ${body.phone},
          ${body.pix_key},
          ${referralCode},
          'pending',
          CURRENT_TIMESTAMP
        )
        RETURNING id, referral_code
      `;

      console.log(`Afiliado criado com ID: ${affiliateResult[0].id}`);

      return NextResponse.json({
        success: true,
        message: 'Cadastro realizado com sucesso! Seu cadastro está em análise.',
        userId: userId,
        affiliateId: affiliateResult[0].id,
        referral_code: affiliateResult[0].referral_code
      }, { status: 201 });
    } catch (error: any) {
      console.error('Erro na inserção:', error);

      // Se o usuário foi criado mas o afiliado não, remover o usuário para manter consistência
      if (userId) {
        try {
          await sql`DELETE FROM users WHERE id = ${userId}`;
          console.log('Usuário removido após falha no registro de afiliado');
        } catch (cleanupError) {
          console.error('Erro ao tentar remover usuário após falha:', cleanupError);
        }
      }

      return NextResponse.json({ error: 'Erro ao registrar afiliado: ' + error.message }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Erro geral:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}