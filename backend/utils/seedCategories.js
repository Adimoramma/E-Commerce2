import Category from '../models/Category.js';

export const seedCategories = async () => {
  try {
    const existingCount = await Category.countDocuments();
    if (existingCount > 0) {
      console.log('Categories already exist in database');
      return;
    }

    const categories = [
      { name: 'Clothes', description: 'Clothing items' },
      { name: 'Wigs', description: 'Hair wigs' },
      { name: 'Perfumes', description: 'Fragrances and perfumes' },
    ];

    await Category.insertMany(categories);
    console.log('Default categories created successfully');
  } catch (err) {
    console.error('Error seeding categories:', err);
  }
};
