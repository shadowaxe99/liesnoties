const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Settings = require('./models/Settings');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/chromeExtensionDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/api/settings/:userId', async (req, res) => {
    const userSettings = await Settings.findOne({ userId: req.params.userId });
    if (!userSettings) return res.status(404).send('The settings with the given ID was not found.');
    res.send(userSettings);
});

app.post('/api/settings', async (req, res) => {
    let userSettings = new Settings({ 
        userId: req.body.userId,
        gptFrequency: req.body.gptFrequency,
        gptType: req.body.gptType,
        voiceDictation: req.body.voiceDictation
    });
    userSettings = await userSettings.save();
    res.send(userSettings);
});

app.put('/api/settings/:userId', async (req, res) => {
    const userSettings = await Settings.findOneAndUpdate(req.params.userId,
        { 
            gptFrequency: req.body.gptFrequency,
            gptType: req.body.gptType,
            voiceDictation: req.body.voiceDictation
        }, { new: true });

    if (!userSettings) return res.status(404).send('The settings with the given ID was not found.');
    
    res.send(userSettings);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));