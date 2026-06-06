const Setting = require('../models/Setting');

// @desc    Get all settings as key-value pair object
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
  try {
    const settingsList = await Setting.find({});
    // Map list to key-value object
    const settings = {};
    settingsList.forEach((s) => {
      settings[s.key] = s.value;
    });

    // Default settings if empty (makes it work out-of-the-box before seeding)
    const defaults = {
      whatsapp_primary: '+923110282668',
      whatsapp_numbers: ['+92 311 028 2668', '+92 300 974 5420', '+92 325 151 2035'],
      contact_email: 'binaoufchemicals.pk@gmail.com',
      address_facility: 'Khushab, Punjab, Pakistan (Near Warcha Salt Mine)',
      address_office: 'Khushab, Punjab, Pakistan',
      working_hours: {
        mon_thu: '9:00 AM to 6:00 PM',
        fri: '9:00 AM to 12:30 PM',
        sat: '10:00 AM to 4:00 PM',
        sun: 'Closed (WhatsApp Active)',
      },
      social_links: {
        linkedin: '',
        facebook: '',
        instagram: '',
        youtube: '',
      },
    };

    const finalSettings = { ...defaults, ...settings };
    res.json(finalSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update setting by key
// @route   POST /api/settings
// @access  Private
const updateSetting = async (req, res) => {
  const { key, value } = req.body;

  try {
    let setting = await Setting.findOne({ key });

    if (setting) {
      setting.value = value;
      await setting.save();
    } else {
      setting = await Setting.create({ key, value });
    }

    res.json({ success: true, key: setting.key, value: setting.value });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Bulk update settings
// @route   POST /api/settings/bulk
// @access  Private
const bulkUpdateSettings = async (req, res) => {
  const { settings } = req.body; // Expects an object { key1: val1, key2: val2 }

  try {
    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ message: 'Invalid settings object format' });
    }

    const keys = Object.keys(settings);
    for (const key of keys) {
      await Setting.findOneAndUpdate(
        { key },
        { value: settings[key] },
        { upsert: true, new: true }
      );
    }

    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSettings,
  updateSetting,
  bulkUpdateSettings,
};
