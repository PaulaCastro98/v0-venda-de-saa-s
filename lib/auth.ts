import crypto from 'crypto';
import { query } from './db';

export async function getUserByEmail(email: string) {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

export async function createUser(email: string, name: string, cpf: string, phone: string, passwordHash: string) {
  const result = await query(
    'INSERT INTO users (email, name, cpf, phone, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name',
    [email, name, cpf, phone, passwordHash]
  );
  return result.rows[0];
}

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function generateReferralCode(): string {
  return 'AFF' + crypto.randomBytes(8).toString('hex').toUpperCase().slice(0, 10);
}
