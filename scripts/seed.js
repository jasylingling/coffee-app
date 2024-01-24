const { db } = require('@vercel/postgres');
const { brews } = require('../src/lib/placeholder-data');

async function seedBrews(client) {
  try {
    // Create the "brews" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS brews (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP NOT NULL,
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
    `;

    console.log('Created "brews" table');

    // Insert data into the "brews" table
    const insertedBrews = await Promise.all(
      brews.map(
        (brew) => client.sql`
          INSERT INTO brews (created_at, favorite, coffee_name, website, rating, image_url, 
            brew_method, cup_size, grind_size, grind_amount, start_time, extraction_time, notes)
          VALUES (
            ${brew.created_at},
            ${brew.favorite},
            ${brew.coffee_name},
            ${brew.website},
            ${brew.rating},
            ${brew.image_url},
            ${brew.brew_method},
            ${brew.cup_size},
            ${brew.grind_size},
            ${brew.grind_amount},
            ${brew.start_time},
            ${brew.extraction_time},
            ${brew.notes}
          )
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedBrews.length} brews`);

    return {
      createTable,
      brews: insertedBrews,
    };
  } catch (error) {
    console.error('Error seeding brews:', error);
    throw error;
  }
}

// Adapt the main function to include the new seeding function
async function main() {
  const client = await db.connect();

  await seedBrews(client);

  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});
