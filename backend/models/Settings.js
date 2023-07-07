const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gptFrequency: {
    type: Number,
    default: 1
  },
  gptType: {
    type: String,
    default: 'contextual'
  },
  textFormat: {
    type: String,
    default: 'plain'
  },
  voiceDictation: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Settings', SettingsSchema);