// scripts/update-plans.js
const fs = require('fs');
const { Pool, neonConfig } = require('@neondatabase/serverless');

// Ler o arquivo .env.local manualmente
let DATABASE_URL;
try {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  const lines = envFile.split('\n');
  for (const line of lines) {
    if (line.startsWith('DATABASE_URL=')) {
      DATABASE_URL = line.substring('DATABASE_URL='.length).trim();
      break;
    }
  }
} catch (error) {
  console.error('❌ Erro ao ler o arquivo .env.local:', error.message);
  process.exit(1);
}

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL não encontrada no arquivo .env.local');
  process.exit(1);
}

console.log('✓ String de conexão encontrada');

// Para ambientes Node.js
try {
  const ws = require('ws');
  neonConfig.webSocketConstructor = ws;
  console.log('✓ WebSocket configurado para Node.js');
} catch (error) {
  console.log('⚠️ Executando sem WebSocket personalizado');
}

const pool = new Pool({
  connectionString: DATABASE_URL,
});

async function updatePlans() {
  let client;
  try {
    console.log('🔄 Conectando ao banco de dados...');
    client = await pool.connect();
    console.log('✓ Conexão estabelecida com sucesso!');

    console.log('🔄 Atualizando planos...');

    // Verificar se os planos existem
    const existingPlans = await client.query('SELECT name FROM plans');
    console.log(`ℹ️ Planos encontrados: ${existingPlans.rows.length}`);

    if (existingPlans.rows.length === 0) {
      console.log('⚠️ Nenhum plano encontrado. Inserindo planos...');

      // Inserir planos se não existirem
      await client.query(`
        INSERT INTO plans (name, price, commission_value, active) VALUES
        ('Essencial', 69.90, 10.00, TRUE),
        ('Profissional', 149.90, 15.00, TRUE),
        ('Empresarial', 600.00, 20.00, TRUE)
      `);

      console.log('✓ Planos inseridos com sucesso!');
    } else {
      // Atualizar planos existentes
      const updateEssencial = await client.query(`
        UPDATE plans SET price = 69.90, commission_value = 10.00 WHERE name = 'Essencial'
      `);
      console.log(`✓ Plano Essencial atualizado: ${updateEssencial.rowCount} linha(s)`);

      const updateProfissional = await client.query(`
        UPDATE plans SET price = 149.90, commission_value = 15.00 WHERE name = 'Profissional'
      `);
      console.log(`✓ Plano Profissional atualizado: ${updateProfissional.rowCount} linha(s)`);

      const updateEmpresarial = await client.query(`
        UPDATE plans SET price = 600.00, commission_value = 20.00 WHERE name = 'Empresarial'
      `);
      console.log(`✓ Plano Empresarial atualizado: ${updateEmpresarial.rowCount} linha(s)`);
    }

    // Verificar planos após a atualização
    const updatedPlans = await client.query('SELECT name, price, commission_value FROM plans');
    console.log('📊 Planos atualizados:');
    updatedPlans.rows.forEach(plan => {
      console.log(`  - ${plan.name}: R$ ${plan.price} (Comissão: R$ ${plan.commission_value})`);
    });

    console.log('✅ Atualização concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro na atualização:', error);
    process.exit(1);
  } finally {
    if (client) {
      client.release();
      console.log('🔌 Cliente liberado');
    }
    await pool.end();
    console.log('🔌 Pool de conexão encerrada');
  }
}

updatePlans()
  .then(() => {
    console.log('🏁 Script finalizado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erro inesperado:', error);
    process.exit(1);
  });