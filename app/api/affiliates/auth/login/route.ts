import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, verifyPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    console.log('[v0] Login attempt started');
    
    const { email, password } = await req.json();

    if (!email || !password) {
      console.log('[v0] Missing email or password');
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    console.log('[v0] Checking user with email:', email);
    const user = await getUserByEmail(email);

    if (!user) {
      console.log('[v0] User not found:', email);
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }

    console.log('[v0] Verifying password...');
    const passwordMatch = verifyPassword(password, user.password_hash);

    if (!passwordMatch) {
      console.log('[v0] Password incorrect for user:', email);
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }

    console.log('[v0] Login successful for user:', email);
    return NextResponse.json(
      {
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Erro no login:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: `Erro ao fazer login: ${errorMessage}` },
      { status: 500 }
    );
  }
}
