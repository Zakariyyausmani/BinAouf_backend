require('dotenv').config();
const mongoose = require('mongoose');

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const categoriesCol = mongoose.connection.db.collection('categories');
  const categories = await categoriesCol.find({}).toArray();

  for (let cat of categories) {
    if (Array.isArray(cat.specifications) && cat.specifications.length > 0 && cat.specifications[0].name) {
      console.log(`Migrating specs for category: ${cat.name}`);
      const headers = ["Name", "Weight (kg)", "Size (cm)", "Packing"];
      const rows = cat.specifications.map(s => [s.name, s.weight, s.size, s.packing]);
      
      await categoriesCol.updateOne(
        { _id: cat._id },
        { $set: { specifications: { headers, rows } } }
      );
      console.log(`Migrated specs for category: ${cat.name}`);
    } else if (!cat.specifications || (Array.isArray(cat.specifications) && cat.specifications.length === 0)) {
       await categoriesCol.updateOne(
        { _id: cat._id },
        { $set: { specifications: { headers: ["Name", "Weight (kg)", "Size (cm)", "Packing"], rows: [] } } }
       );
       console.log(`Initialized empty specs for category: ${cat.name}`);
    } else {
       console.log(`Category ${cat.name} already in new format.`);
    }
  }

  console.log('Migration Complete');
  process.exit(0);
}

migrate();
