// server.js
const express = require('express');
const cors = require('cors'); 
// For Node versions older than 18, uncomment the following line:
// const fetch = require('node-fetch');

const app = express();
app.use(cors()); 
const PORT = process.env.PORT || 3000;
// Use an environment variable to store your API key securely
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Proxy endpoint for weather data
app.get('/weather', async (req, res) => {
    const zip = req.query.zip;
    if (!zip) {
        return res.status(400).json({ error: 'Zip code is required.' });
    }
    try {
        // Construct the OpenWeatherMap API URL with your API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${API_KEY}&units=imperial`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});