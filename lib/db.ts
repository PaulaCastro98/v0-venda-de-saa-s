// lib/db.ts
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PoolClient } from '@neondatabase/serverless';

// ✅ Carregamento condicional de 'ws'
// Verifica se estamos em um ambiente Node.js (não Edge)
// Isso é para o ambiente de desenvolvimento local e Node.js.
// Em ambientes Edge, 'ws' não é necessário e não deve ser carregado.
if (typeof process !== 'undefined' && process.release && process.release.name === 'node') {
  try {
    // @ts-ignore: 'ws' é importado dinamicamente e pode não ter tipos diretos aqui
    neonConfig.webSocketConstructor = require('ws');
  } catch (e) {
    console.warn("Could not load 'ws' module. This is expected in Edge environments.");
  }
}

let pool: Pool;

export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    pool = new Pool({ connectionString });
    pool.on('error', (err) => console.error('Erro no pool do banco de dados:', err));
  }
  return pool;
}

export async function query(text: string, params?: (string | number | boolean | null)[]) {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

export async function withTransaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}