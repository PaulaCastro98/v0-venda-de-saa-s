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
  plan_id: number;
  commission_amount: number;
  status: string;
  created_at: Date;
  paid_at: Date | null;
}

export async function getAffiliateByUserId(userId: number) {
  const result = await query(
    'SELECT * FROM affiliates WHERE user_id = $1',
    [userId]
  );
  return result.rows[0] as Affiliate | undefined;
}

export async function getAffiliateByReferralCode(code: string) {
  const result = await query(
    'SELECT * FROM affiliates WHERE referral_code = $1',
    [code]
  );
  return result.rows[0] as Affiliate | undefined;
}

export async function createAffiliate(userId: number, referralCode: string, pixKey: string) {
  const result = await query(
    'INSERT INTO affiliates (user_id, referral_code, pix_key) VALUES ($1, $2, $3) RETURNING *',
    [userId, referralCode, pixKey]
  );
  return result.rows[0] as Affiliate;
}

export async function getLeadsByAffiliateId(affiliateId: number) {
  const result = await query(
    `SELECT l.*, p.name as product_name, pl.name as plan_name, pl.price 
     FROM leads l 
     JOIN products p ON l.product_id = p.id 
     JOIN plans pl ON l.plan_id = pl.id 
     WHERE l.affiliate_id = $1 
     ORDER BY l.created_at DESC`,
    [affiliateId]
  );
  return result.rows as (Lead & { product_name: string; plan_name: string; price: number })[];
}

export async function createLead(affiliateId: number, productId: number, planId: number, clientEmail: string, clientName: string) {
  const result = await query(
    'INSERT INTO leads (affiliate_id, product_id, plan_id, client_email, client_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [affiliateId, productId, planId, clientEmail, clientName]
  );
  return result.rows[0] as Lead;
}

export async function getCommissionsByAffiliateId(affiliateId: number) {
  const result = await query(
    `SELECT ac.*, c.name as client_name, c.email as client_email, pl.name as plan_name
     FROM affiliate_commissions ac
     JOIN clients c ON ac.client_id = c.id
     JOIN plans pl ON ac.plan_id = pl.id
     WHERE ac.affiliate_id = $1
     ORDER BY ac.created_at DESC`,
    [affiliateId]
  );
  return result.rows as (Commission & { client_name: string; client_email: string; plan_name: string })[];
}

export async function getAffiliateStats(affiliateId: number) {
  const result = await query(
    `SELECT 
      COUNT(DISTINCT l.id) as total_leads,
      COUNT(DISTINCT CASE WHEN l.status = 'converted' THEN l.id END) as converted_leads,
      COUNT(DISTINCT c.id) as total_clients,
      SUM(CASE WHEN ac.status = 'paid' THEN ac.commission_amount ELSE 0 END) as total_paid,
      SUM(CASE WHEN ac.status = 'pending' THEN ac.commission_amount ELSE 0 END) as pending_commissions
     FROM affiliates a
     LEFT JOIN leads l ON a.id = l.affiliate_id
     LEFT JOIN clients c ON l.id = c.lead_id
     LEFT JOIN affiliate_commissions ac ON a.id = ac.affiliate_id
     WHERE a.id = $1
     GROUP BY a.id`,
    [affiliateId]
  );
  return result.rows[0];
}
