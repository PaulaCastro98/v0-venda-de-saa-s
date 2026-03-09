// app/api/admin/update-plans/route.ts
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(request: Request) {
  try {
    // Verificar se a solicitação é local
    const url = new URL(request.url);
    if (!url.hostname.includes('localhost') && !url.hostname.includes('127.0.0.1')) {
      return NextResponse.json({ error: 'Esta API só pode ser acessada localmente' }, { status: 403 });
    }

    console.log('Conectando ao banco de dados...');
    const sql = neon(process.env.DATABASE_URL!);
    console.log('Conexão estabelecida!');

    // Verificar se os planos existem
    const existingPlans = await sql`SELECT name FROM plans`;
    console.log(`Planos encontrados: ${existingPlans.length}`);

    if (existingPlans.length === 0) {
      console.log('Nenhum plano encontrado. Inserindo planos...');

      // Inserir planos se não existirem
      await sql`
        INSERT INTO plans (name, price, commission_value, active) VALUES
        ('Essencial', 69.90, 10.00, TRUE),
        ('Profissional', 149.90, 15.00, TRUE),
        ('Empresarial', 600.00, 20.00, TRUE)
      `;
    } else {
      console.log('Atualizando planos existentes...');

      // Atualizar planos existentes
      await sql`UPDATE plans SET price = 69.90, commission_value = 10.00 WHERE name = 'Essencial'`;
      await sql`UPDATE plans SET price = 149.90, commission_value = 15.00 WHERE name = 'Profissional'`;
      await sql`UPDATE plans SET price = 600.00, commission_value = 20.00 WHERE name = 'Empresarial'`;
    }

    // Verificar planos após a atualização
    const updatedPlans = await sql`SELECT name, price, commission_value FROM plans`;

    return NextResponse.json({
      success: true,
      message: 'Planos atualizados com sucesso!',
      plans: updatedPlans
    });
  } catch (error: any) {
    console.error('Erro ao atualizar planos:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}