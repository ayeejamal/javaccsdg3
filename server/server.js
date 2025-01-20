// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // if you're using MongoDB
const Product = require('./models/Product'); // Replace with your actual models

const app = express();
const port = process.env.PORT || 8082;

// Enable CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Your React frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); // To parse incoming JSON requests

// Sample Product API Route
app.patch('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    const updates = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: updates },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// Connect to MongoDB (if using MongoDB)
mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
