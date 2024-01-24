'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

const FormSchema = z.object({
  id: z.string(),
  created_at: z.string(),
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

const CreateBrew = FormSchema.omit({ id: true, created_at: true });

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
  const created_at = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO brews (coffee_name, website, rating, brew_method, cup_size, grind_size, grind_amount, start_time, extraction_time, notes, created_at)
    VALUES (${coffee_name}, ${website}, ${rating}, ${brew_method}, ${cup_size}, ${grind_size}, ${grind_amount}, ${start_time}, ${extraction_time}, ${notes}, ${created_at})
  `;

  revalidatePath('/brews');
}
