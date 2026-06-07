const QuoteRequest = require('../models/QuoteRequest');
const Product = require('../models/Product');
const Testimonial = require('../models/Testimonial');
const nodemailer = require('nodemailer');

// @desc    Submit a new quote request
// @route   POST /api/quotes
// @access  Public
const submitQuoteRequest = async (req, res) => {
  const {
    name,
    company,
    email,
    phone,
    country,
    productInterest,
    orderType,
    quantity,
    targetMarket,
    message,
  } = req.body;

  try {
    const quote = new QuoteRequest({
      name,
      company,
      email,
      phone,
      country,
      productInterest,
      orderType,
      quantity,
      targetMarket,
      message,
    });

    const savedQuote = await quote.save();

    // Send email notification (Nodemailer)
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const emailTo = process.env.EMAIL_TO || 'binaoufchemicals.pk@gmail.com';

    // Build email HTML
    const emailHtml = `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e8d0b8; background-color: #fdf6ee; color: #7a5040;">
        <h2 style="color: #8a3a28; border-bottom: 2px solid #8a3a28; padding-bottom: 10px;">New Quote Request Received</h2>
        <p>You have received a new business inquiry from the Bin Aouf website.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background-color: #f5e8d8;">
            <td style="padding: 8px; font-weight: bold; width: 150px;">Name:</td>
            <td style="padding: 8px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Company:</td>
            <td style="padding: 8px;">${company || 'N/A'}</td>
          </tr>
          <tr style="background-color: #f5e8d8;">
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;"><a href="mailto:${email}" style="color: #8a3a28;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">WhatsApp/Phone:</td>
            <td style="padding: 8px;">${phone || 'N/A'}</td>
          </tr>
          <tr style="background-color: #f5e8d8;">
            <td style="padding: 8px; font-weight: bold;">Country:</td>
            <td style="padding: 8px;">${country}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Product Interest:</td>
            <td style="padding: 8px; color: #5c2318; font-weight: bold;">${productInterest}</td>
          </tr>
          <tr style="background-color: #f5e8d8;">
            <td style="padding: 8px; font-weight: bold;">Order Type:</td>
            <td style="padding: 8px;">${orderType}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Quantity:</td>
            <td style="padding: 8px;">${quantity || 'N/A'}</td>
          </tr>
          <tr style="background-color: #f5e8d8;">
            <td style="padding: 8px; font-weight: bold;">Target Market:</td>
            <td style="padding: 8px;">${targetMarket || 'N/A'}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #8a3a28; background-color: #f5e8d8;">
          <h4 style="margin-top: 0; margin-bottom: 5px; color: #8a3a28;">Message:</h4>
          <p style="margin: 0; white-space: pre-wrap; font-style: italic;">"${message}"</p>
        </div>
        <p style="margin-top: 30px; font-size: 12px; color: #7a5040; border-top: 1px solid #e8d0b8; padding-top: 10px; text-align: center;">
          This inquiry was sent automatically from Bin Aouf Salt Exporter Platform.
        </p>
      </div>
    `;

    if (smtpHost && smtpUser && smtpPass) {
      // Send real email
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort == 465, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"${name} via Bin Aouf" <${smtpUser}>`,
        to: emailTo,
        subject: `New Salt Export Quote Request: ${productInterest} from ${country}`,
        html: emailHtml,
        replyTo: email,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Nodemailer Error: ', err.message);
        } else {
          console.log('Nodemailer Success: ', info.messageId);
        }
      });
    } else {
      console.log('SMTP config missing in environment variables. Skipped sending email alert.');
      console.log('Submission content (logged for debug):');
      console.log(JSON.stringify(req.body, null, 2));
    }

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully. Our team will contact you shortly.',
      data: savedQuote,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all quote requests
// @route   GET /api/quotes
// @access  Private
const getQuoteRequests = async (req, res) => {
  try {
    const quotes = await QuoteRequest.find({}).sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update quote request status
// @route   PUT /api/quotes/:id/status
// @access  Private
const updateQuoteStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const quote = await QuoteRequest.findById(req.params.id);

    if (quote) {
      quote.status = status || quote.status;
      const updatedQuote = await quote.save();
      res.json(updatedQuote);
    } else {
      res.status(404).json({ message: 'Quote request not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a quote request
// @route   DELETE /api/quotes/:id
// @access  Private
const deleteQuoteRequest = async (req, res) => {
  try {
    const quote = await QuoteRequest.findById(req.params.id);

    if (quote) {
      await quote.deleteOne();
      res.json({ message: 'Quote request removed' });
    } else {
      res.status(404).json({ message: 'Quote request not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get analytics summary
// @route   GET /api/quotes/analytics
// @access  Private
const getAnalytics = async (req, res) => {
  try {
    const totalQuotes = await QuoteRequest.countDocuments({});
    const pendingQuotes = await QuoteRequest.countDocuments({ status: 'Pending' });
    const repliedQuotes = await QuoteRequest.countDocuments({ status: 'Replied' });
    const closedQuotes = await QuoteRequest.countDocuments({ status: 'Closed' });

    const totalProducts = await Product.countDocuments({});
    const totalTestimonials = await Testimonial.countDocuments({});

    // Group quotes by date for simple trends (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const quotesTrend = await QuoteRequest.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.json({
      summary: {
        totalQuotes,
        pendingQuotes,
        repliedQuotes,
        closedQuotes,
        totalProducts,
        totalTestimonials,
      },
      quotesTrend,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitQuoteRequest,
  getQuoteRequests,
  updateQuoteStatus,
  deleteQuoteRequest,
  getAnalytics,
};
