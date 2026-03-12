import { NextRequest, NextResponse } from 'next/server';
import { approveLead } from '@/lib/affiliates-db';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }  // ✅ Promise aqui
) {
  try {
    const { id } = await params;  // ✅ await aqui
    const leadId = parseInt(id);

    if (!leadId) {
      return NextResponse.json(
        { error: 'ID do lead inválido' },
        { status: 400 }
      );
    }

    const result = await approveLead(leadId);

    return NextResponse.json({
      message: 'Lead aprovado com sucesso!',
      commission_amount: result.commission_amount,
    }, { status: 200 });

  } catch (error) {
    console.error('[v0] Erro ao aprovar lead:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: `Erro ao aprovar lead: ${errorMessage}` },
      { status: 500 }
    );
  }
}