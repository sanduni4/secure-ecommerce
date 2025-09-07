const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for seeding'))
  .catch(err => console.error(err));

// Seed function
const seedData = async () => {
  try {
    // Clear existing users and products
    await User.deleteMany();
    await Product.deleteMany();

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin'
    });
    console.log('✅ Admin user created:', adminUser.email);

    // Sample products
    const products = [
      { name: 'T-Shirt', description: 'Cotton T-Shirt', price: 20, stock: 50 },
      { name: 'Jeans', description: 'Blue Denim Jeans', price: 50, stock: 30 },
      { name: 'Sneakers', description: 'Comfortable Sneakers', price: 75, stock: 20 }
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`✅ ${createdProducts.length} products created`);

    console.log('🌟 Seeding completed');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
};

seedData();
