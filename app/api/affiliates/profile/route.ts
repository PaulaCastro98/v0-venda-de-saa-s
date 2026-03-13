import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db'; // Importar 'query' para usar diretamente, se necessário
import { getUserByEmail } from '@/lib/auth'; // Assumindo que getUserByEmail está em '@/lib/auth'

// Função para buscar afiliado por user_id (se não estiver em '@/lib/affiliates-db')
async function getAffiliateByUserId(userId: number) {
  const result = await query(
    `SELECT id, user_id, referral_code, pix_key, status, total_earned, total_leads, total_clients FROM affiliates WHERE user_id = $1`,
    [userId]
  );
  return result.rows[0];
}

// Função para buscar stats do afiliado (se ainda precisar de algo dinâmico)
// Ajustei esta função para buscar os totais diretamente da tabela 'affiliates'
// e calcular as comissões pendentes.
async function getAffiliateStats(affiliateId: number) {
  const statsResult = await query(
    `SELECT 
       COALESCE(SUM(CASE WHEN status = 'approved' THEN commission_amount ELSE 0 END), 0) as pending_commissions,
       COALESCE(SUM(CASE WHEN status = 'paid' THEN commission_amount ELSE 0 END), 0) as total_paid_commissions_sum -- Renomeado para evitar confusão
     FROM affiliate_commissions
     WHERE affiliate_id = $1`,
    [affiliateId]
  );

  const stats = statsResult.rows[0];

  // Retorna os valores calculados
  return {
    pending_commissions: parseFloat(stats.pending_commissions || '0'),
    total_paid_commissions_sum: parseFloat(stats.total_paid_commissions_sum || '0'),
  };
}


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
    // ✅ BUSCA DIRETAMENTE total_earned, total_leads, total_clients da tabela affiliates
    const affiliate = await getAffiliateByUserId(user.id); 
    if (!affiliate) {
      console.log('[v0] Affiliate not found for user_id:', user.id);
      return NextResponse.json(
        { error: 'Afiliado não encontrado' },
        { status: 404 }
      );
    }

    // ✅ Buscar apenas as comissões pendentes, já que total_earned já vem do 'affiliate'
    console.log('[v0] Fetching real-time pending commissions for affiliate:', affiliate.id);     
    const commissionStats = await getAffiliateStats(affiliate.id); // Renomeado para evitar conflito

    console.log('[v0] Profile found, returning data');
    return NextResponse.json(
      {
        id: affiliate.id,
        user_id: affiliate.user_id, // Adicionado user_id
        email: user.email,
        name: user.name,
        referral_code: affiliate.referral_code,
        pix_key: affiliate.pix_key,
        status: affiliate.status,
        // ✅ total_earned vem diretamente da tabela affiliates (já atualizado pelo admin)
        total_earned: parseFloat(String(affiliate.total_earned || 0)), 
        // ✅ total_leads e total_clients também vêm da tabela affiliates
        total_leads: affiliate.total_leads || 0,
        total_clients: affiliate.total_clients || 0,
        // ✅ pending_commissions vem do cálculo em tempo real
        pending_commissions: commissionStats.pending_commissions,
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