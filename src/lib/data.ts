import { sql } from '@vercel/postgres';
import { Brews } from './definition';

export async function fetchBrews(): Promise<Brews[]> {
  try {
    const data = await sql<Brews>`
      SELECT * FROM brews`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch brews data.');
  }
}
