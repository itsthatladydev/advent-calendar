const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
const port = 3000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
let corsOptions = {
    credentials: true,
    origin: 'http://127.0.0.1:5500', // Be specific about origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Accept']
};

app.use(cors(corsOptions));

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/generate-recipe', async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
            { role: "system", content: "You are a helpful recipe creator" },
            {
                role: "user",
                content: "Generate a random holiday cookie recipe with ingredients and instructions.",
            },
        ],
        });

        res.json({ recipe: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Failed to generate recipe', 
            details: error.message });
    }
});

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});