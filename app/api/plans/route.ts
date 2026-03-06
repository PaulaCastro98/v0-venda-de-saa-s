import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query('SELECT id, name, price FROM plans ORDER BY price');
    return NextResponse.json({ plans: result.rows });
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    return NextResponse.json({ error: 'Erro ao buscar planos' }, { status: 500 });
  }
}
