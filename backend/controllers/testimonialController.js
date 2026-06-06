const Testimonial = require('../models/Testimonial');

// @desc    Get all active testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
  try {
    const adminMode = req.query.admin === 'true';
    const filter = adminMode ? {} : { isActive: true };
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private
const createTestimonial = async (req, res) => {
  const { name, location, companyType, rating, quote, avatarLetter, isActive } = req.body;

  try {
    const testimonial = new Testimonial({
      name,
      location,
      companyType,
      rating: rating || 5,
      quote,
      avatarLetter: avatarLetter || name.charAt(0).toUpperCase(),
      isActive: isActive !== undefined ? isActive : true,
    });

    const createdTestimonial = await testimonial.save();
    res.status(201).json(createdTestimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private
const updateTestimonial = async (req, res) => {
  const { name, location, companyType, rating, quote, avatarLetter, isActive } = req.body;

  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      testimonial.name = name || testimonial.name;
      testimonial.location = location || testimonial.location;
      testimonial.companyType = companyType !== undefined ? companyType : testimonial.companyType;
      testimonial.rating = rating !== undefined ? rating : testimonial.rating;
      testimonial.quote = quote || testimonial.quote;
      testimonial.avatarLetter = avatarLetter || testimonial.avatarLetter;
      testimonial.isActive = isActive !== undefined ? isActive : testimonial.isActive;

      const updatedTestimonial = await testimonial.save();
      res.json(updatedTestimonial);
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    // Note: fix typo in updateTestimonial: it says updatedQuote instead of updatedTestimonial. Let's make sure it returns updatedTestimonial.
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      await testimonial.deleteOne();
      res.json({ message: 'Testimonial removed' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
