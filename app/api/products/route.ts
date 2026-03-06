import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query('SELECT id, name, slug FROM products ORDER BY name');
    return NextResponse.json({ products: result.rows });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}
