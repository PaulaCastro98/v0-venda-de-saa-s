import { NextRequest, NextResponse } from 'next/server';
import { createLead, getLeadsByAffiliateId } from '@/lib/affiliates-db';

export async function GET(req: NextRequest) {
  try {
    const affiliateId = req.nextUrl.searchParams.get('affiliate_id');

    if (!affiliateId) {
      return NextResponse.json(
        { error: 'affiliate_id é obrigatório' },
        { status: 400 }
      );
    }

    const leads = await getLeadsByAffiliateId(parseInt(affiliateId));
    return NextResponse.json({ leads }, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar leads' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[v0] Creating lead with data:', body);
    
    const { affiliate_id, product_id, plan_id, client_email, client_name } = body;

    if (!affiliate_id || !product_id || !plan_id || !client_email || !client_name) {
      console.log('[v0] Missing required fields for lead');
      return NextResponse.json(
        { error: 'Campos obrigatórios: affiliate_id, product_id, plan_id, client_email, client_name' },
        { status: 400 }
      );
    }

    console.log('[v0] Calling createLead...');
    const lead = await createLead(
      parseInt(String(affiliate_id)),
      parseInt(String(product_id)),
      parseInt(String(plan_id)),
      client_email,
      client_name
    );
    console.log('[v0] Lead created successfully:', lead);

    return NextResponse.json(
      {
        message: 'Lead criado com sucesso',
        lead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Erro ao criar lead:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: `Erro ao criar lead: ${errorMessage}` },
      { status: 500 }
    );
  }
}
