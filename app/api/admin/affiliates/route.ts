// app/api/admin/affiliates/route.ts
import { NextResponse } from 'next/server';
import { query, withTransaction } from '@/lib/db'; // ✅ Importa withTransaction

export async function GET() {
  try {
    const result = await query(`
      SELECT
        a.id,
        a.referral_code,
        a.status,
        a.total_earned,
        a.total_leads,
        a.total_clients,
        a.blocked_reason, -- ✅ Adicionado blocked_reason para o GET
        u.name,
        u.email
      FROM affiliates a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
    `);
    return NextResponse.json({ affiliates: result.rows });
  } catch (error) {
    console.error('Erro ao buscar afiliados:', error);
    return NextResponse.json({ error: 'Erro ao buscar afiliados' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status, blocked_reason } = await req.json();

    // ✅ Usa withTransaction para garantir atomicidade
    const updatedAffiliate = await withTransaction(async (client) => {
      const result = await client.query( // ✅ Usa o cliente da transação
        'UPDATE affiliates SET status = $1, blocked_reason = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
        [status, blocked_reason || null, id]
      );

      const affiliate = result.rows[0];

      if (!affiliate) {
        throw new Error('Afiliado não encontrado após atualização'); // Lança erro para rollback
      }
      return affiliate; // Retorna o afiliado atualizado
    });

    return NextResponse.json({ affiliate: updatedAffiliate });
  } catch (error) {
    console.error('Erro ao atualizar afiliado no backend:', error); // Log mais específico
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: `Erro interno ao atualizar afiliado: ${errorMessage}` }, { status: 500 });
  }
}