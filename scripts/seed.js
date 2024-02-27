const { Client } = require('pg');
const { brews } = require('../src/lib/placeholder-data');
const { loadEnvConfig } = require('@next/env');

async function seedBrews(client) {
  try {
    // Create the "brews" table if it doesn't exist
    const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS brews (
        id SERIAL PRIMARY KEY,
        edited_at TIMESTAMP,
        favorite INTEGER,
        coffee_name VARCHAR(255) NOT NULL,
        website VARCHAR(255),
        rating INTEGER,
        image_url VARCHAR(255),
        brew_method VARCHAR(255) NOT NULL,
        cup_size INTEGER NOT NULL,
        grind_size INTEGER NOT NULL,
        grind_amount FLOAT NOT NULL,
        start_time INTEGER,
        extraction_time INTEGER,
        notes TEXT
      );
    `);

    console.log('Created "brews" table');

    // Add trigger function to update edited_at
    const createFunction = await client.query(`
     CREATE OR REPLACE FUNCTION update_edited_at()
     RETURNS TRIGGER AS $$
     BEGIN
       NEW.edited_at = CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Zurich';
       RETURN NEW;
     END;
     $$ LANGUAGE plpgsql;
   `);

    console.log('Created trigger function "update_edited_at"');

    // Add trigger to call the function before each update
    const createTrigger = await client.query(`
     CREATE TRIGGER update_brews_edited_at
     BEFORE UPDATE ON brews
     FOR EACH ROW
     EXECUTE FUNCTION update_edited_at();
   `);

    console.log('Created trigger "update_brews_edited_at"');

    // Insert data into the "brews" table
    const insertedBrews = await Promise.all(
      brews.map((brew) =>
        client.query(
          'INSERT INTO brews (favorite, coffee_name, website, rating, brew_method, cup_size, grind_size, grind_amount, start_time, extraction_time, notes, edited_at, image_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
          [
            brew.favorite,
            brew.coffee_name,
            brew.website,
            brew.rating,
            brew.brew_method,
            brew.cup_size,
            brew.grind_size,
            brew.grind_amount,
            brew.start_time,
            brew.extraction_time,
            brew.notes,
            brew.edited_at,
            brew.image_url,
          ],
        ),
      ),
    );

    console.log(`Seeded ${insertedBrews.length} brews`);

    return {
      createTable,
      createFunction,
      createTrigger,
      brews: insertedBrews,
    };
  } catch (error) {
    console.error('Error seeding brews:', error);
    throw error;
  }
}

// Adapt the main function to include the new seeding function
async function main() {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  const client = new Client({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
  });
  await client.connect();

  await seedBrews(client);

  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});
