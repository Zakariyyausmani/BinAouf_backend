require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log('Connected to MongoDB');

  const categories = await Category.find();
  for (let cat of categories) {
    if (Array.isArray(cat.specifications) && cat.specifications.length > 0 && cat.specifications[0].name) {
      // It's the old format
      const oldSpecs = cat.specifications;
      const headers = ["Name", "Weight (kg)", "Size (cm)", "Packing"];
      const rows = oldSpecs.map(s => [s.name, s.weight, s.size, s.packing]);
      
      cat.specifications = { headers, rows };
      await cat.save();
      console.log(`Migrated specs for category: ${cat.name}`);
    } else if (!cat.specifications || (Array.isArray(cat.specifications) && cat.specifications.length === 0)) {
       cat.specifications = { headers: ["Name", "Weight (kg)", "Size (cm)", "Packing"], rows: [] };
       await cat.save();
       console.log(`Initialized empty specs for category: ${cat.name}`);
    }
  }

  console.log('Migration Complete');
  process.exit(0);
}

migrate();
