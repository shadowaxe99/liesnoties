const mongoose = require('mongoose');
const User = require('./models/User');
const Settings = require('./models/Settings');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    console.error(err.message);
  }
};

const getSettings = async (userId) => {
  try {
    const settings = await Settings.findOne({ user: userId });
    return settings;
  } catch (err) {
    console.error(err.message);
  }
};

const saveSettings = async (userId, settingsData) => {
  try {
    let settings = await Settings.findOne({ user: userId });

    if (settings) {
      settings = await Settings.findOneAndUpdate(
        { user: userId },
        { $set: settingsData },
        { new: true }
      );
    } else {
      settings = new Settings({ user: userId, ...settingsData });
      await settings.save();
    }

    return settings;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { connectDB, getUser, getSettings, saveSettings };