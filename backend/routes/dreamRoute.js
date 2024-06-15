const express = require('express');
const { createDream } = require('../controllers/dreamController');
const authMiddleware = require('../middleware/auth');
const Dream = require('../models/Dream');

const router = express.Router();

router.get('/today', authMiddleware, async (req, res) => {
    console.log('GET /api/dream/today route reached');
    try {
        const userId = req.user.id;
        const requestedDate = req.query.date;

        console.log('Requested date:', requestedDate);

        const dreams = await Dream.find({
            userId: userId,
            date: requestedDate // Exact match
        });

        console.log('Dreams found:', dreams);

        res.status(200).json(dreams);
    } catch (error) {
        console.error('Error fetching dreams:', error);
        res.status(500).json({ message: 'Error fetching dreams.' });
    }
});

router.post('/save', authMiddleware, createDream);

module.exports = router;
