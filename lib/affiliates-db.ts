import { query } from '@/lib/db';

export interface Affiliate {
  id: number;
  user_id: number;
  referral_code: string;
  pix_key: string;
  status: string;
  blocked_reason: string | null;
  total_earned: number;
  total_leads: number;
  total_clients: number;
  created_at: Date;
  updated_at: Date;
}

export interface Lead {
  id: number;
  affiliate_id: number;
  product_id: number;
  plan_id: number;
  client_email: string;
  client_name: string;
  status: string;
  created_at: Date;
}

export interface Commission {
  id: number;
  affiliate_id: number;
  client_id: number;
  billing_cycle_id: number | null;
  commission_amount: number;
  status: string;
  created_at: Date;
  paid_at: Date | null;
}

// ============================================================
// AFFILIATES
// ============================================================

export async function getAffiliateByUserId(userId: number) {
  try {
    const result = await query(
      'SELECT * FROM affiliates WHERE user_id = $1',
      [userId]
    );
    return result.rows[0] as Affiliate | undefined;
  } catch (error) {
    console.error('[DB] Erro ao buscar afiliado por user_id:', error);
    throw error;
  }
}

export async function getAffiliateByReferralCode(code: string) {
  try {
    const result = await query(
      'SELECT * FROM affiliates WHERE referral_code = $1',
      [code]
    );
    return result.rows[0] as Affiliate | undefined;
  } catch (error) {
    console.error('[DB] Erro ao buscar afiliado por referral_code:', error);
    throw error;
  }
}

export async function createAffiliate(
  userId: number,
  referralCode: string,
  pixKey: string
) {
  try {
    const result = await query(
      `INSERT INTO affiliates 
        (user_id, referral_code, pix_key, status, total_earned, created_at, updated_at) 
       VALUES ($1, $2, $3, 'active', 0, NOW(), NOW()) 
       RETURNING *`,
      [userId, referralCode, pixKey]
    );
    return result.rows[0] as Affiliate;
  } catch (error) {
    console.error('[DB] Erro ao criar afiliado:', error);
    throw error;
  }
}

// ============================================================
// LEADS
// ============================================================

export async function getLeadsByAffiliateId(affiliateId: number) {
  try {
    const result = await query(
      `SELECT 
        l.*,
        p.name  as product_name,
        pl.name as plan_name,
        pl.price
       FROM leads l
       LEFT JOIN products p  ON l.product_id = p.id
       LEFT JOIN plans   pl  ON l.plan_id    = pl.id
       WHERE l.affiliate_id = $1
       ORDER BY l.created_at DESC`,
      [affiliateId]
    );
    return result.rows as (Lead & {
      product_name: string;
      plan_name: string;
      price: number;
    })[];
  } catch (error) {
    console.error('[DB] Erro ao buscar leads:', error);
    throw error;
  }
}

export async function createLead(
  affiliateId: number,
  productId: number,
  planId: number,
  clientEmail: string,
  clientName: string
) {
  try {
    const result = await query(
      `INSERT INTO leads 
        (affiliate_id, product_id, plan_id, client_email, client_name,
         contact_email, contact_name, status, created_at, updated_at) 
       VALUES 
        ($1, $2, $3, $4, $5, $4, $5, 'pending', NOW(), NOW()) 
       RETURNING *`,
      [affiliateId, productId, planId, clientEmail, clientName]
    );
    return result.rows[0] as Lead;
  } catch (error) {
    console.error('[DB] Erro ao criar lead:', error);
    throw error;
  }
}

export async function approveLead(leadId: number) {
  try {
    console.log('[DB] ========== INICIANDO APROVAÇÃO ==========');
    console.log('[DB] Lead ID:', leadId);

    // 1. Buscar dados do lead + comissão do plano
    console.log('[DB] Buscando dados do lead...');
    const leadResult = await query(
      `SELECT l.*, pl.commission_value 
       FROM leads l
       JOIN plans pl ON l.plan_id = pl.id
       WHERE l.id = $1`,
      [leadId]
    );

    if (!leadResult.rows[0]) {
      throw new Error(`Lead ${leadId} não encontrado`);
    }

    const lead = leadResult.rows[0];
    console.log('[DB] Lead encontrado:', {
      id: lead.id,
      affiliate_id: lead.affiliate_id,
      client_name: lead.client_name,
      client_email: lead.client_email,
      product_id: lead.product_id,
      plan_id: lead.plan_id,
      commission_value: lead.commission_value
    });

    if (!lead.commission_value) {
      throw new Error(`Plano do lead ${leadId} não tem commission_value definido`);
    }

    // 2. Atualizar status do lead
    console.log('[DB] Atualizando status do lead...');
    await query(
      `UPDATE leads 
       SET status = $1, updated_at = NOW() 
       WHERE id = $2`,
      ['approved', leadId]
    );
    console.log('[DB] ✅ Status atualizado!');

    // 3. Verificar se já existe um cliente para esse lead
    console.log('[DB] Verificando se cliente já existe...');
    const existingClient = await query(
      `SELECT id FROM clients WHERE lead_id = $1`,
      [leadId]
    );

    let clientId: number;

    if (existingClient.rows.length > 0) {
      clientId = existingClient.rows[0].id;
      console.log('[DB] ✅ Cliente já existe, id:', clientId);
    } else {
      // Criar o cliente
      console.log('[DB] Criando novo cliente...');
      const clientResult = await query(
        `INSERT INTO clients
          (affiliate_id, lead_id, company_name, contact_name, contact_email,
           contact_whatsapp, product_id, plan_id, status, created_at, updated_at)
         VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
         RETURNING id`,
        [
          lead.affiliate_id,
          leadId,
          lead.client_name || 'Cliente',
          lead.client_name || 'Cliente',
          lead.client_email,
          lead.contact_whatsapp || '',
          lead.product_id,
          lead.plan_id,
          'active'
        ]
      );
      clientId = clientResult.rows[0].id;
      console.log('[DB] ✅ Cliente criado, id:', clientId);
    }

    // 4. Verificar se comissão já existe
    console.log('[DB] Verificando se comissão já existe...');
    const existingCommission = await query(
      `SELECT id FROM affiliate_commissions 
       WHERE affiliate_id = $1 AND client_id = $2`,
      [lead.affiliate_id, clientId]
    );

    if (existingCommission.rows.length > 0) {
      console.log('[DB] ⚠️ Comissão já existe!');
      return { success: true, commission_amount: lead.commission_value };
    }

    // 5. Inserir comissão
    console.log('[DB] Inserindo comissão...');
    const commissionResult = await query(
      `INSERT INTO affiliate_commissions 
        (affiliate_id, client_id, commission_amount, status, created_at, updated_at)
       VALUES 
        ($1, $2, $3, $4, NOW(), NOW())
       RETURNING *`,
      [lead.affiliate_id, clientId, lead.commission_value, 'pending']
    );
    console.log('[DB] ✅ Comissão inserida:', commissionResult.rows[0]);

    // 6. Atualizar total_earned
    console.log('[DB] Atualizando total_earned...');
    await query(
      `UPDATE affiliates 
       SET total_earned = COALESCE(total_earned, 0) + $1,
           updated_at = NOW()
       WHERE id = $2`,
      [lead.commission_value, lead.affiliate_id]
    );
    console.log('[DB] ✅ total_earned atualizado!');

    console.log('[DB] ========== APROVAÇÃO CONCLUÍDA ==========');
    return { success: true, commission_amount: lead.commission_value };

  } catch (error) {
    console.error('[DB] ❌ ERRO AO APROVAR LEAD:', error);
    throw error;
  }
}

// ============================================================
// COMMISSIONS
// ============================================================

export async function getCommissionsByAffiliateId(affiliateId: number) {
  try {
    const result = await query(
      `SELECT 
        ac.*,
        l.client_name,
        l.client_email,
        pl.name as plan_name
       FROM affiliate_commissions ac
       LEFT JOIN leads l  ON ac.client_id        = l.id
       LEFT JOIN plans pl ON l.plan_id            = pl.id
       WHERE ac.affiliate_id = $1
       ORDER BY ac.created_at DESC`,
      [affiliateId]
    );
    return result.rows as (Commission & {
      plan_name: string;
      client_name: string;
      client_email: string;
    })[];
  } catch (error) {
    console.error('[DB] Erro ao buscar comissões:', error);
    throw error;
  }
}

// ============================================================
// STATS
// ============================================================

export async function getAffiliateStats(affiliateId: number) {
  try {
    const result = await query(
      `SELECT 
        COUNT(DISTINCT l.id) as total_leads,
        COUNT(DISTINCT CASE WHEN l.status = 'approved' THEN l.id END) as converted_leads,
        COALESCE(SUM(CASE WHEN ac.status = 'paid'    THEN ac.commission_amount ELSE 0 END), 0) as total_paid,
        COALESCE(SUM(CASE WHEN ac.status = 'pending' THEN ac.commission_amount ELSE 0 END), 0) as pending_commissions
       FROM affiliates a
       LEFT JOIN leads l               ON a.id = l.affiliate_id
       LEFT JOIN affiliate_commissions ac ON a.id = ac.affiliate_id
       WHERE a.id = $1
       GROUP BY a.id`,
      [affiliateId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('[DB] Erro ao buscar stats:', error);
    throw error;
  }
}