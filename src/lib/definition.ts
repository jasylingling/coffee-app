export type Brews = {
  id: number;
  created_at: string;
  favorite: number;
  coffee_name: string;
  website: string;
  rating: number;
  image_url: string;
  brew_method: string;
  grind_amount: number;
  grind_size: 1 | 2; // cup size can only be 1 or 2
  start_time: number;
  extraction_time: number;
  notes: string;
};
