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

export async function fetchBrewsByFavs(): Promise<Brews[]> {
  noStore();
  try {
    const data = await sql<Brews>`
      SELECT * FROM brews
      WHERE favorite = 1
      ORDER BY edited_at DESC`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch favorite brews.');
  }
}

export async function fetchBrewsThisWeek() {
  noStore();
  try {
    const data = await sql`
      SELECT COUNT(*) AS count FROM brews WHERE edited_at >= date_trunc('week', CURRENT_DATE)`;
    return data.rows[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total brews this week.');
  }
}

export async function fetchBrewsLastWeek() {
  noStore();
  try {
    const data = await sql`
      SELECT COUNT(*) AS count
      FROM brews
      WHERE edited_at < date_trunc('week', CURRENT_DATE)
      AND edited_at >= date_trunc('week', CURRENT_DATE) - interval '1 week'`;
    return data.rows[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total brews last week.');
  }
}

export async function fetchTotalBeans() {
  noStore();
  try {
    const data = await sql`
      SELECT COUNT(*) AS count FROM brews`;
    return data.rows[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total beans.');
  }
}

export async function fetchTotalFavs() {
  noStore();
  try {
    const data = await sql`
      SELECT COUNT(*) AS count
      FROM brews
      WHERE favorite = 1`;
    return data.rows[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total favorites.');
  }
}

export async function fetchAverageRating() {
  noStore();
  try {
    const data = await sql`
      SELECT ROUND(AVG(rating), 1) AS average
      FROM brews`;
    return data.rows[0].average;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch average rating.');
  }
}

export async function fetchLowestRating() {
  noStore();
  try {
    const data = await sql`
      SELECT MIN(rating) AS lowest_rating FROM brews`;
    return data.rows[0].lowest_rating;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lowest rating.');
  }
}

export async function fetchHighestRating() {
  noStore();
  try {
    const data = await sql`
      SELECT MAX(rating) AS highest_rating FROM brews`;
    return data.rows[0].highest_rating;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch highest rating.');
  }
}
