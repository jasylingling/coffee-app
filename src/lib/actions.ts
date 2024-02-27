'use server';

import { z } from 'zod';
import { Client } from 'pg';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

const sql = async (query: string, values: (number | string)[]) => {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
  });
  await client.connect();
  const result = await client.query(query, values);
  await client.end();
  return result;
};

const FormSchema = z.object({
  id: z.number(),
  edited_at: z.string(),
  favorite: z.coerce.number(),
  coffee_name: z.string(),
  website: z.string(),
  rating: z.coerce.number(),
  brew_method: z.string(),
  cup_size: z.enum(['1', '2']),
  grind_size: z.coerce.number(),
  grind_amount: z.coerce.number(),
  start_time: z.coerce.number(),
  extraction_time: z.coerce.number(),
  notes: z.string(),
});

const CreateBrew = FormSchema.omit({ id: true, edited_at: true });
const UpdateBrew = FormSchema.omit({ id: true, edited_at: true });

export async function createBrew(formData: FormData) {
  const {
    favorite,
    coffee_name,
    website,
    brew_method,
    rating,
    cup_size,
    grind_size,
    grind_amount,
    start_time,
    extraction_time,
    notes,
  } = CreateBrew.parse({
    favorite: formData.get('favorite'),
    coffee_name: formData.get('coffee_name'),
    website: formData.get('website'),
    rating: formData.get('rating'),
    brew_method: formData.get('brew_method'),
    cup_size: formData.get('cup_size'),
    grind_size: formData.get('grind_size'),
    grind_amount: formData.get('grind_amount'),
    start_time: formData.get('start_time'),
    extraction_time: formData.get('extraction_time'),
    notes: formData.get('notes'),
  });
  const timeZone = 'Europe/Zurich';
  const edited_at = new Date().toLocaleString('en-US', { timeZone });
  const image_url = `https://source.unsplash.com/400x320/?coffee-beans=${Math.random()}`;

  await sql(
    'INSERT INTO brews (favorite, coffee_name, website, rating, brew_method, cup_size, grind_size, grind_amount, start_time, extraction_time, notes, edited_at, image_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
    [
      favorite,
      coffee_name,
      website,
      rating,
      brew_method,
      cup_size,
      grind_size,
      grind_amount,
      start_time,
      extraction_time,
      notes,
      edited_at,
      image_url,
    ],
  );

  revalidatePath('/brews');
  redirect('/brews');
}

export async function updateBrew(id: number, formData: FormData) {
  noStore();
  const {
    favorite,
    coffee_name,
    website,
    brew_method,
    rating,
    cup_size,
    grind_size,
    grind_amount,
    start_time,
    extraction_time,
    notes,
  } = UpdateBrew.parse({
    favorite: formData.get('favorite') ? 1 : 0,
    coffee_name: formData.get('coffee_name'),
    website: formData.get('website'),
    rating: formData.get('rating'),
    brew_method: formData.get('brew_method'),
    cup_size: formData.get('cup_size'),
    grind_size: formData.get('grind_size'),
    grind_amount: formData.get('grind_amount'),
    start_time: formData.get('start_time'),
    extraction_time: formData.get('extraction_time'),
    notes: formData.get('notes'),
  });

  await sql(
    'UPDATE brews SET favorite = $1, coffee_name = $2, website = $3, rating = $4, brew_method = $5, cup_size = $6, grind_size = $7, grind_amount = $8, start_time = $9, extraction_time = $10, notes = $11 WHERE id = $12',
    [
      favorite,
      coffee_name,
      website,
      rating,
      brew_method,
      cup_size,
      grind_size,
      grind_amount,
      start_time,
      extraction_time,
      notes,
      id,
    ],
  );

  revalidatePath('/brews');
  redirect('/brews');
}

export async function updateRatingBrew(id: number, rating: number) {
  noStore();
  await sql('UPDATE brews SET rating = $1 WHERE id = $2', [rating, id]);

  revalidatePath('/brews');
}

export async function deleteBrew(id: number) {
  noStore();
  await sql('DELETE FROM brews WHERE id = $1', [id]);
  revalidatePath('/brews');
  redirect('/brews');
}

export async function updateFavBrew(id: number, favorite: number) {
  noStore();
  await sql('UPDATE brews SET favorite = $1 WHERE id = $2', [favorite, id]);

  revalidatePath('/brews');
}
