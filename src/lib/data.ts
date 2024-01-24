import { sql } from '@vercel/postgres';
import { Brews } from './definition';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchBrews(): Promise<Brews[]> {
  noStore();
  try {
    const data = await sql<Brews>`
      SELECT * FROM brews`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch brews data.');
  }
}
