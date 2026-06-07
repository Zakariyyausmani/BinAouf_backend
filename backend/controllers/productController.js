const Product = require('../models/Product');
const Category = require('../models/Category');

// ==========================================
// CATEGORIES CONTROLLERS
// ==========================================

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private
const createCategory = async (req, res) => {
  const { name, slug, icon, description, order, specifications } = req.body;

  try {
    const categoryExists = await Category.findOne({ slug });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category slug already exists' });
    }

    const category = new Category({
      name,
      slug,
      icon,
      description,
      order: order || 0,
      specifications: specifications || [],
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private
const updateCategory = async (req, res) => {
  const { name, slug, icon, description, order, specifications } = req.body;

  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      category.name = name || category.name;
      category.slug = slug || category.slug;
      category.icon = icon !== undefined ? icon : category.icon;
      category.description = description !== undefined ? description : category.description;
      category.order = order !== undefined ? order : category.order;
      if (specifications !== undefined) {
        category.specifications = specifications;
      }

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      // Check if any product is associated with this category
      const productCount = await Product.countDocuments({ category: req.params.id });
      if (productCount > 0) {
        return res.status(400).json({ message: 'Cannot delete category with associated products' });
      }

      await category.deleteOne();
      res.json({ message: 'Category removed' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// PRODUCTS CONTROLLERS
// ==========================================

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('category').sort({ order: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  const { name, category, description, tags, imageUrl, isFeatured, order } = req.body;

  try {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category referenced' });
    }

    const product = new Product({
      name,
      category,
      description,
      tags: tags || [],
      imageUrl: imageUrl || '',
      isFeatured: isFeatured || false,
      order: order || 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  const { name, category, description, tags, imageUrl, isFeatured, order } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      if (category) {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
          return res.status(400).json({ message: 'Invalid category referenced' });
        }
        product.category = category;
      }

      product.name = name || product.name;
      product.description = description || product.description;
      product.tags = tags || product.tags;
      product.imageUrl = imageUrl !== undefined ? imageUrl : product.imageUrl;
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.order = order !== undefined ? order : product.order;

      const updatedProduct = await product.save();
      const populatedProduct = await Product.findById(updatedProduct._id).populate('category');
      res.json(populatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
