const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  gptPreferences: {
    type: Object,
    default: {}
  },
  voiceDictationPreferences: {
    type: Object,
    default: {}
  },
  formatPreferences: {
    type: Object,
    default: {}
  }
});

module.exports = mongoose.model('User', UserSchema);