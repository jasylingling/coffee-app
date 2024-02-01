'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

const FormSchema = z.object({
  id: z.number(),
  edited_at: z.string(),
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

  await sql`
    INSERT INTO brews (coffee_name, website, rating, brew_method, cup_size, grind_size, grind_amount, start_time, extraction_time, notes, edited_at)
    VALUES (${coffee_name}, ${website}, ${rating}, ${brew_method}, ${cup_size}, ${grind_size}, ${grind_amount}, ${start_time}, ${extraction_time}, ${notes}, ${edited_at})
  `;

  revalidatePath('/brews');
  redirect('/brews');
}

export async function updateBrew(id: number, formData: FormData) {
  const {
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

  await sql`
    UPDATE brews
    SET coffee_name = ${coffee_name}, website = ${website}, rating = ${rating}, brew_method = ${brew_method}, cup_size = ${cup_size}, grind_size = ${grind_size}, grind_amount = ${grind_amount}, start_time = ${start_time}, extraction_time = ${extraction_time}, notes = ${notes} 
    WHERE id = ${id}
  `;

  revalidatePath('/brews');
  redirect('/brews');
}

export async function updateRatingBrew(id: number, rating: number) {
  noStore();
  await sql`
    UPDATE brews
    SET rating = ${rating} 
    WHERE id = ${id}
  `;

  revalidatePath('/brews');
}

export async function deleteBrew(id: number) {
  await sql`DELETE FROM brews WHERE id = ${id}`;
  revalidatePath('/brews');
  redirect('/brews');
}
