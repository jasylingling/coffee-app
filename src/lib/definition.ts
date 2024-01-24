export type Brews = {
  id: number; // will be created on the database
  created_at: string;
  // favorite: number; -> will be used later in issue #28 (Favoritenliste)
  coffee_name: string;
  website: string;
  rating: number;
  image_url: string;
  brew_method: string;
  cup_size: '1' | '2'; // cup size can only be 1 or 2
  grind_size: number;
  grind_amount: number;
  start_time: number;
  extraction_time: number;
  notes: string;
};
