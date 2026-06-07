const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AdminUser = require('./models/AdminUser');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Testimonial = require('./models/Testimonial');
const Setting = require('./models/Setting');

// Load environment variables
dotenv.config();

// Connect to Database
const dbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bin_aouf';

const seedData = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await AdminUser.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Testimonial.deleteMany({});
    await Setting.deleteMany({});

    console.log('Data cleared.');

    // 1. Create Default Admin User
    const admin = await AdminUser.create({
      username: 'admin',
      password: 'admin123', // Will be hashed by pre-save hook
    });
    console.log('Admin user seeded: admin / admin123');

    // 2. Create Categories
    const categoriesData = [
      { name: 'Edible Salt', slug: 'pp-edible', icon: '🧂', description: 'Pure food-grade Himalayan pink and white salts for gourmet culinary use.', order: 1 },
      { name: 'Animal Lick Salt', slug: 'pp-animal', icon: '🐄', description: 'Natural mineral block licks on rope or compressed, perfect for livestock nutrition.', order: 2 },
      { name: 'Bath and Spa Salt', slug: 'pp-bath', icon: '🛁', description: 'Detoxifying bath crystals, fine powders, soap bars, and smooth massage stones.', order: 3 },
      { name: 'Décor and Lamps', slug: 'pp-decor', icon: '🕯', description: 'Handcrafted natural, sphere, and geometric salt lamps providing an ambient, healthy glow.', order: 4 },
      { name: 'Salt Tiles', slug: 'pp-tiles', icon: '🟫', description: 'Polished or natural tiles for cooking, cold food service, and dry-aging chambers.', order: 5 },
      { name: 'Salt Bricks', slug: 'pp-bricks', icon: '🧱', description: 'Heavy salt construction blocks for salt caves, therapy rooms, and architecture.', order: 6 },
      { name: 'Custom and Bulk', slug: 'pp-custom', icon: '🎨', description: 'Bulk shipping, specialized cuts, and industrial grading tailored for global B2B clients.', order: 7 }
    ];

    const seededCategories = await Category.insertMany(categoriesData);
    console.log('Categories seeded.');

    // Map slug to category ObjectId
    const categoryMap = {};
    seededCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    // 3. Create 42 Products (6 per category)
    const productsData = [
      // 1. Edible Salt
      {
        name: 'Premium Pink Fine Salt',
        category: categoryMap['pp-edible'],
        description: 'Finely ground, mineral-rich gourmet cooking salt suitable for daily kitchen use and baking.',
        tags: ['Size: Fine (0-1mm)', 'Grade: Food Grade', 'ISO 22000', 'Halal', 'FDA Compliant'],
        imageUrl: '',
        order: 1
      },
      {
        name: 'Premium Pink Coarse Salt',
        category: categoryMap['pp-edible'],
        description: 'Crisp pink salt crystals ideal for salt grinders, seasoning meats, and adding a crunchy mineral finish.',
        tags: ['Size: Coarse (2-5mm)', 'Grade: Food Grade', 'ISO 22000', 'Halal', 'FDA Compliant'],
        imageUrl: '',
        order: 2
      },
      {
        name: 'Dark Pink Salt Granules',
        category: categoryMap['pp-edible'],
        description: 'Deep rose-colored granules packed with iron and trace elements, perfect for artisanal spice blends.',
        tags: ['Size: Medium (1-2mm)', 'Grade: Food Grade', 'ISO 22000', 'Halal'],
        imageUrl: '',
        order: 3
      },
      {
        name: 'White Crystal Himalayan Salt',
        category: categoryMap['pp-edible'],
        description: 'Selected ultra-pure white salt crystals, clean sodium flavor with natural background trace minerals.',
        tags: ['Size: Fine / Coarse', 'Grade: Food Grade', 'ISO 22000', 'FDA Compliant'],
        imageUrl: '',
        order: 4
      },
      {
        name: 'Black Himalayan Salt (Kala Namak)',
        category: categoryMap['pp-edible'],
        description: 'Traditional sulfur-infused rock salt with a unique savory flavor profile, widely used in vegan cooking and medicine.',
        tags: ['Size: Powder / Fine', 'Grade: Food Grade', 'Traditional Use', 'Halal'],
        imageUrl: '',
        order: 5
      },
      {
        name: 'Organic Iodized Himalayan Salt',
        category: categoryMap['pp-edible'],
        description: 'Rich pink salt fortified with healthy iodine to prevent thyroid deficiencies while retaining organic purity.',
        tags: ['Size: Fine (0-1mm)', 'Grade: Food Grade', 'Fortified', 'ISO 22000', 'FDA'],
        imageUrl: '',
        order: 6
      },

      // 2. Animal Lick Salt
      {
        name: 'Himalayan Salt Block on Rope',
        category: categoryMap['pp-animal'],
        description: 'Solid rock salt block with a drilled center and heavy organic rope. Easy to hang in horse stalls or pastures.',
        tags: ['Weight: 2-5kg', 'Grade: Feed Grade', 'All Natural', 'Weather Resistant'],
        imageUrl: '',
        order: 7
      },
      {
        name: 'Compressed Mineral Salt Lick',
        category: categoryMap['pp-animal'],
        description: 'Uniformly compressed block containing supplementary cobalt, selenium, and copper for enhanced livestock vitality.',
        tags: ['Weight: 5kg / 10kg', 'Grade: Feed Grade', 'Fortified Minerals', 'Standard Fit'],
        imageUrl: '',
        order: 8
      },
      {
        name: 'Natural Shape Mineral Salt Lick',
        category: categoryMap['pp-animal'],
        description: 'Rough-hewn natural rock blocks directly from mine veins. High durability in pastures, preferred by cattle.',
        tags: ['Weight: 10-25kg', 'Grade: Feed Grade', 'Raw Rock Salt', 'Organic Cert'],
        imageUrl: '',
        order: 9
      },
      {
        name: 'Red Iron Rich Salt Lick',
        category: categoryMap['pp-animal'],
        description: 'Specially selected dark red salt blocks containing optimal iron and manganese to support bovine muscle function.',
        tags: ['Weight: 3-5kg', 'Grade: Feed Grade', 'High Iron', 'No Additives'],
        imageUrl: '',
        order: 10
      },
      {
        name: 'Fine Ground Livestock Lick Salt',
        category: categoryMap['pp-animal'],
        description: 'Granular feed-grade pink salt, perfect for mixing directly into cattle grain blends and silage.',
        tags: ['Size: Granular (1-3mm)', 'Grade: Feed Grade', 'Bulk Mix', 'High Purity'],
        imageUrl: '',
        order: 11
      },
      {
        name: 'Animal Lick Salt with Bentonite Clay',
        category: categoryMap['pp-animal'],
        description: 'Natural block enriched with organic montmorillonite clay for gastrointestinal binding and detoxification.',
        tags: ['Weight: 5kg', 'Grade: Feed Grade', 'Clay Infused', 'Detox Formula'],
        imageUrl: '',
        order: 12
      },

      // 3. Bath and Spa Salt
      {
        name: 'Pink Bath Salt Crystals',
        category: categoryMap['pp-bath'],
        description: 'Coarse rose-colored crystals that dissolve in warm bathwater to detoxify the skin and ease muscle cramps.',
        tags: ['Grade: Cosmetic', 'Size: 3-8mm', 'All Natural', 'Relaxation Use'],
        imageUrl: '',
        order: 13
      },
      {
        name: 'Exfoliating Bath Salt Powder',
        category: categoryMap['pp-bath'],
        description: 'Micro-fine pink salt powder, ideal as a base for body scrubs, face washes, and mineral mud masks.',
        tags: ['Grade: Cosmetic', 'Size: Powder (<0.5mm)', 'Skin Care', 'Exfoliating'],
        imageUrl: '',
        order: 14
      },
      {
        name: 'Relaxing Foot Soak Granules',
        category: categoryMap['pp-bath'],
        description: 'Rich pink salt granules designed for foot bath spas. Promotes circulation, relieves ache, and softens skin.',
        tags: ['Grade: Cosmetic', 'Mineral Rich', 'Therapeutic', 'Fast Dissolve'],
        imageUrl: '',
        order: 15
      },
      {
        name: 'Himalayan Salt Soap Bar',
        category: categoryMap['pp-bath'],
        description: 'Solid, shaped salt bar that functions as a natural deodorant and antibacterial skin scrub bar.',
        tags: ['Form: Solid Bar', 'Natural Soap', 'Antibacterial', 'Exfoliating'],
        imageUrl: '',
        order: 16
      },
      {
        name: 'Mineral Detox Spa Salt Blend',
        category: categoryMap['pp-bath'],
        description: 'Premium spa blend of coarse pink salt, magnesium flakes, and selected essential flower oils.',
        tags: ['Grade: Premium Spa', 'Enhanced Formula', 'Infused Oils', 'Body Soak'],
        imageUrl: '',
        order: 17
      },
      {
        name: 'Salt Spa Massage Stones',
        category: categoryMap['pp-bath'],
        description: 'Smooth, hand-carved teardrop and oval stones. Retain heat beautifully for therapeutic hot-stone massages.',
        tags: ['Form: Smooth Stones', 'Heat Retention', 'Massage Therapy', 'Durable'],
        imageUrl: '',
        order: 18
      },

      // 4. Décor and Lamps
      {
        name: 'Natural Himalayan Salt Lamp',
        category: categoryMap['pp-decor'],
        description: 'Classic, rough-carved rock salt lamp. Emits soft orange glow and naturally purifies the surrounding air.',
        tags: ['Weight: 2-5kg', 'Base: Neem Wood', '15W Bulb Included', 'Air Purifying'],
        imageUrl: '',
        order: 19
      },
      {
        name: 'Polished Sphere Salt Lamp',
        category: categoryMap['pp-decor'],
        description: 'Perfectly spherical carved salt lamp, combining modern geometry with the natural radiance of pink salt.',
        tags: ['Weight: 3-4kg', 'Base: Rosewood', 'Crafted Design', 'Warm Glow'],
        imageUrl: '',
        order: 20
      },
      {
        name: 'Modern Cylinder Salt Lamp',
        category: categoryMap['pp-decor'],
        description: 'Sleek cylindrical shaped salt lamp, fits beautifully into contemporary offices and minimalist bedrooms.',
        tags: ['Weight: 4-5kg', 'Sleek Finish', 'Base: Premium Wood', 'Ambient Light'],
        imageUrl: '',
        order: 21
      },
      {
        name: 'Fire Bowl with Glowing Salt Orbs',
        category: categoryMap['pp-decor'],
        description: 'A beautiful carved bowl filled with round glowing salt balls, creating a flickering ember fire effect.',
        tags: ['Weight: 4kg', 'Multi-Piece', 'Dynamic Effect', 'Accent Décor'],
        imageUrl: '',
        order: 22
      },
      {
        name: 'USB Mini Color-Changing Lamp',
        category: categoryMap['pp-decor'],
        description: 'Compact USB-powered natural salt lamp with a color-changing LED. Ideal for workstations, laptops, and desks.',
        tags: ['Power: USB 5V', 'LED Light', 'Color-Changing', 'Desktop Size'],
        imageUrl: '',
        order: 23
      },
      {
        name: 'Geometric Cube Salt Lamp',
        category: categoryMap['pp-decor'],
        description: 'Crisp, cube-shaped pink salt lamp. Perfectly cut facets reflect light in gorgeous, sharp gradients.',
        tags: ['Weight: 3kg', 'Cube Shape', 'Contemporary', 'Neem Base'],
        imageUrl: '',
        order: 24
      },

      // 5. Salt Tiles
      {
        name: 'Polished Salt Tile',
        category: categoryMap['pp-tiles'],
        description: 'Smoothly polished salt tile. Widely used for building modern glowing walls in spas and dry-aging chambers.',
        tags: ['Size: 8x4x1 inch', 'Finish: Polished', 'Use: Salt Rooms / Aging', 'Heat Treated'],
        imageUrl: '',
        order: 25
      },
      {
        name: 'Rustic Natural Back Salt Tile',
        category: categoryMap['pp-tiles'],
        description: 'Tile with a polished front face and a rough, natural mineral back. Provides a 3D textured look on backlit walls.',
        tags: ['Size: 8x4x1 inch', 'Finish: Semi-Rough', 'Wall Paneling', 'Ambient Light'],
        imageUrl: '',
        order: 26
      },
      {
        name: 'Cooking & Grilling Salt Block',
        category: categoryMap['pp-tiles'],
        description: 'Thick, dense salt slab designed to be heated on grills or stovetops. Imbues food with a subtle salty mineral glaze.',
        tags: ['Size: 8x8x2 inch', 'High Heat Threshold', 'Reusable', 'Gourmet Cooking'],
        imageUrl: '',
        order: 27
      },
      {
        name: 'Chilled Serving Salt Plank',
        category: categoryMap['pp-tiles'],
        description: 'Chilled presentation plank ideal for displaying sushi, sashimi, carpaccio, cheese, and fruits at events.',
        tags: ['Size: 12x8x1.5 inch', 'Cold Retention', 'Presentation Plate', 'Clean Finish'],
        imageUrl: '',
        order: 28
      },
      {
        name: 'Extra Durable Heavy Wall Tile',
        category: categoryMap['pp-tiles'],
        description: 'Double-thick salt tile for industrial spa installations, public salt caves, and high-load architectural fixtures.',
        tags: ['Size: 8x4x2 inch', 'Heavy Duty', 'Spa Grade', 'Thermal Insulation'],
        imageUrl: '',
        order: 29
      },
      {
        name: 'Square Construction Tile',
        category: categoryMap['pp-tiles'],
        description: 'Perfect square tile, simplifying layout calculations for contractors building dry saunas and salt caves.',
        tags: ['Size: 6x6x1 inch', 'Standard Square', 'Easy Install', 'Clean Cuts'],
        imageUrl: '',
        order: 30
      },

      // 6. Salt Bricks
      {
        name: 'Standard Salt Brick',
        category: categoryMap['pp-bricks'],
        description: 'Solid salt construction brick. Standard red clay brick sizes, perfect for masonry walls in home therapy rooms.',
        tags: ['Size: 8x4x2 inch', 'Masonry Grade', 'Structural Build', 'Therapeutic'],
        imageUrl: '',
        order: 31
      },
      {
        name: 'Curved Arch Salt Brick',
        category: categoryMap['pp-bricks'],
        description: 'Tapered brick shape for locking into arched doorways, columns, and circular fire fixtures in salt structures.',
        tags: ['Form: Curved Block', 'Arch Fitting', 'Precision Milled', 'Cave Construction'],
        imageUrl: '',
        order: 32
      },
      {
        name: 'Lightweight Salt Veneer Brick',
        category: categoryMap['pp-bricks'],
        description: 'Thin salt brick designed for lightweight wall adhesive applications where standard structural loads are restricted.',
        tags: ['Size: 8x4x0.5 inch', 'Veneer Grade', 'Lightweight', 'Decorative Wall'],
        imageUrl: '',
        order: 33
      },
      {
        name: 'Textured Face Structural Brick',
        category: categoryMap['pp-bricks'],
        description: 'Heavy brick with standard dimensions but a deeply textured, split-rock face for bold dramatic lighting.',
        tags: ['Size: 8x4x2 inch', 'Split Rock Face', 'High Texture', 'Backlight Ready'],
        imageUrl: '',
        order: 34
      },
      {
        name: 'Pure White Crystal Salt Brick',
        category: categoryMap['pp-bricks'],
        description: 'Rare white crystal brick, transmitting backlight with clear brightness. Ideal for creating glowing borders.',
        tags: ['Size: 8x4x2 inch', 'Color: Pure White', 'High Translucency', 'Premium Accent'],
        imageUrl: '',
        order: 35
      },
      {
        name: 'Industrial Heavy Salt Block Brick',
        category: categoryMap['pp-bricks'],
        description: 'Extra large salt brick with massive thermal storage capacity, suitable for hot salt rooms and baking chambers.',
        tags: ['Size: 12x6x3 inch', 'Industrial Grade', 'Maximum Mass', 'Thermal Storage'],
        imageUrl: '',
        order: 36
      },

      // 7. Custom and Bulk
      {
        name: 'Bulk Pink Salt Fine (25kg Bags)',
        category: categoryMap['pp-custom'],
        description: 'Fine ground pink salt shipped in double-ply woven poly bags, ready for commercial packaging or food manufacturing.',
        tags: ['Packaging: 25kg Poly Bag', 'Terms: FOB Karachi', 'Min Order: 20ft Container', 'Industrial Price'],
        imageUrl: '',
        order: 37
      },
      {
        name: 'Bulk Pink Salt Coarse (1-Ton Sacks)',
        category: categoryMap['pp-custom'],
        description: 'Medium and coarse grade pink salt crystals shipped in heavy 1-metric-ton bulk supersacks with lifting loops.',
        tags: ['Packaging: 1-Ton Jumbo Bag', 'Terms: FOB Karachi', 'B2B Wholesale', 'Grinder Ready'],
        imageUrl: '',
        order: 38
      },
      {
        name: 'De-Icing Natural Road Salt',
        category: categoryMap['pp-custom'],
        description: 'Industrial-grade raw mined salt, an eco-friendly and cost-effective solution for clearing winter highways and runways.',
        tags: ['Packaging: Bulk Vessel / Sack', 'Grade: Industrial', 'Corrosion Inhibited', 'Winter Supply'],
        imageUrl: '',
        order: 39
      },
      {
        name: 'Bulk Mined Livestock Lick Rocks',
        category: categoryMap['pp-custom'],
        description: 'Raw lump salt stones in container-load bulk shipments, ideal for commercial agriculture cooperatives.',
        tags: ['Packaging: Bulk Container', 'Terms: FOB / CIF', 'Raw Ore', 'Feed Grade'],
        imageUrl: '',
        order: 40
      },
      {
        name: 'Architectural Custom Milled Blocks',
        category: categoryMap['pp-custom'],
        description: 'Salt blocks custom cut and polished to specific CAD drawings for luxury hotels, spas, and museum exhibits.',
        tags: ['Size: Custom', 'Finish: Custom Spec', 'Architectural Use', 'Made-to-Order'],
        imageUrl: '',
        order: 41
      },
      {
        name: 'Bulk White Softening Salt',
        category: categoryMap['pp-custom'],
        description: 'High-purity white salt granules for industrial chemical manufacturing, food brine processing, and water purification.',
        tags: ['Packaging: 25kg / Bulk', 'Purity: >99.5% NaCl', 'B2B Export', 'Chemical Grade'],
        imageUrl: '',
        order: 42
      }
    ];

    await Product.insertMany(productsData);
    console.log('42 Products seeded successfully.');

    // 4. Create Default Testimonials
    const testimonialsData = [
      {
        name: 'Arthur Pendelton',
        location: 'Munich, Germany',
        companyType: 'Gourmet Foods Importer',
        rating: 5,
        quote: 'Working with Bin Aouf has transformed our sourcing. Their edible pink salt is of exceptional purity, and the packaging options (especially the customized 25kg sacks) were handled with complete professionalism. Port Qasim export logistics were flawless.',
        avatarLetter: 'A',
        isActive: true
      },
      {
        name: 'Elena Rostova',
        location: 'Saint Petersburg, Russia',
        companyType: 'Luxury Spa Builder',
        rating: 5,
        quote: 'The precision-cut salt tiles and bricks we received for our wellness center project are beautiful. Standard sizes were exact to the millimeter, and the backlighting effect on the rustic bricks has given our salt therapy rooms a true wow factor.',
        avatarLetter: 'E',
        isActive: true
      },
      {
        name: 'Hassan Al-Mansoori',
        location: 'Dubai, UAE',
        companyType: 'Agricultural Supply Group',
        rating: 5,
        quote: 'Bin Aouf is our reliable supplier of animal lick blocks on rope. Cattle farmers in our network prefer their raw natural rocks because of the durability and rich mineral content. Their customer support via WhatsApp is incredibly fast.',
        avatarLetter: 'H',
        isActive: true
      }
    ];

    await Testimonial.insertMany(testimonialsData);
    console.log('Testimonials seeded.');

    // 5. Create Default Settings
    const settingsData = [
      { key: 'whatsapp_primary', value: '+923110282668' },
      { key: 'whatsapp_numbers', value: ['+92 311 028 2668', '+92 300 974 5420', '+92 325 151 2035'] },
      { key: 'contact_email', value: 'binaoufchemicals.pk@gmail.com' },
      { key: 'address_facility', value: 'Khushab, Punjab, Pakistan (Near Warcha Salt Mine)' },
      { key: 'address_office', value: 'Khushab, Punjab, Pakistan' },
      {
        key: 'working_hours',
        value: {
          mon_thu: '9:00 AM to 6:00 PM',
          fri: '9:00 AM to 12:30 PM',
          sat: '10:00 AM to 4:00 PM',
          sun: 'Closed (WhatsApp Active)',
        }
      },
      {
        key: 'social_links',
        value: {
          linkedin: 'https://linkedin.com/company/bin-aouf-salt',
          facebook: 'https://facebook.com/binaoufsalt',
          instagram: 'https://www.instagram.com/binaouf.chemicals?igsh=eGlkZWtoMjBtYmg4',
          youtube: 'https://youtube.com/c/binaoufsalt',
        }
      }
    ];

    await Setting.insertMany(settingsData);
    console.log('Site Settings seeded.');

    console.log('Database Seeding Completed Successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error: ', error.message);
    process.exit(1);
  }
};

seedData();
