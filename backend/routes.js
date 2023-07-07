const express = require('express');
const router = express.Router();

const User = require('./models/User');
const Settings = require('./models/Settings');

// Route to save user settings
router.post('/saveSettings', async (req, res) => {
    const { userId, settings } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userSettings = await Settings.findOne({ user: userId });
        if (userSettings) {
            userSettings.settings = settings;
            await userSettings.save();
        } else {
            const newSettings = new Settings({ user: userId, settings });
            await newSettings.save();
        }

        res.status(200).json({ message: 'Settings saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to load user settings
router.get('/loadSettings/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userSettings = await Settings.findOne({ user: userId });
        if (!userSettings) {
            return res.status(404).json({ message: 'Settings not found' });
        }

        res.status(200).json(userSettings.settings);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;