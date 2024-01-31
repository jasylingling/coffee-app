const brews = [
  {
    id: 1,
    edited_at: '2023-12-15',
    favorite: 1, // 0 = not a favorite, 1 = favorite
    coffee_name: 'ViCAFE Hausmischung',
    website: 'https://vicafe.ch',
    rating: 2, // 1-5
    image_url: 'public/img/coffee-beans.jpg',
    brew_method: 'Sage Barista Pro',
    cup_size: 1, // 1 or 2 cup
    grind_size: 6,
    grind_amount: 14,
    start_time: 7,
    extraction_time: 22,
    notes: 'zu sauer',
  },
  {
    id: 2,
    edited_at: '2023-08-03',
    favorite: 0, // 0 = not a favorite, 1 = favorite
    coffee_name: 'Costa Blonde',
    website: 'https://costa.com',
    rating: 5, // 1-5
    image_url: 'public/img/coffee-beans.jpg',
    brew_method: 'Sage Barista Pro',
    cup_size: 2, // 1 or 2 cup
    grind_size: 8,
    grind_amount: 15,
    start_time: 8,
    extraction_time: 36,
    notes: 'sooooo delicioso!',
  },
  {
    id: 3,
    edited_at: '2022-12-09',
    favorite: 1, // 0 = not a favorite, 1 = favorite
    coffee_name: 'ViCAFE Nogales',
    website: 'https://vicafe.ch',
    rating: 4, // 1-5
    image_url: 'public/img/coffee-beans.jpg',
    brew_method: 'Sage Barista Pro',
    cup_size: 2, // 1 or 2 cup
    grind_size: 10,
    grind_amount: 16,
    start_time: 10,
    extraction_time: 32,
    notes: 'zu sauer',
  },
];

module.exports = {
  brews,
};
