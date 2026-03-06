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
    const { affiliate_id, product_id, plan_id, client_email, client_name } = await req.json();

    if (!affiliate_id || !product_id || !plan_id || !client_email || !client_name) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: affiliate_id, product_id, plan_id, client_email, client_name' },
        { status: 400 }
      );
    }

    const lead = await createLead(
      affiliate_id,
      product_id,
      plan_id,
      client_email,
      client_name
    );

    return NextResponse.json(
      {
        message: 'Lead criado com sucesso',
        lead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar lead:', error);
    return NextResponse.json(
      { error: 'Erro ao criar lead' },
      { status: 500 }
    );
  }
}
