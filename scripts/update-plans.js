import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function updatePlans() {
  const client = await pool.connect();
  try {
    console.log('Updating plans...');

    // Update existing plans with new prices
    await client.query(`
      UPDATE plans SET price = 69.90 WHERE name = 'Essencial'
    `);
    console.log('✓ Updated Essencial plan');

    await client.query(`
      UPDATE plans SET price = 149.90 WHERE name = 'Profissional'
    `);
    console.log('✓ Updated Profissional plan');

    await client.query(`
      UPDATE plans SET price = 600.00 WHERE name = 'Empresarial'
    `);
    console.log('✓ Updated Empresarial plan');

    console.log('✅ Plans updated successfully!');
  } catch (error) {
    console.error('❌ Update failed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

updatePlans();
