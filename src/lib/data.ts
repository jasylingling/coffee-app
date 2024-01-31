import { sql } from '@vercel/postgres';
import { Brews } from './definition';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchBrews(): Promise<Brews[]> {
  noStore();
  try {
    const data = await sql<Brews>`
      SELECT * FROM brews
      ORDER BY edited_at DESC`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch brews data.');
  }
}

export async function fetchBrewById(id: number) {
  noStore();
  try {
    const data = await sql<Brews>`
      SELECT * FROM brews WHERE id = ${id}`;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch brew.');
  }
}
