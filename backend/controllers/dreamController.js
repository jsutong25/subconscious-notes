const Dream = require('../models/Dream');

const createDream = async (req, res) => {
  try {
    const userId = req.user.id;
    const date = req.body.date; // Assume date is already in correct format
    const content = req.body.content;

    // Check if a dream already exists for the user and date
    let dream = await Dream.findOne({ userId, date });

    if (dream) {
      // Update the existing dream
      dream.content = content;
      await dream.save();
      res.status(200).json(dream); // Return the updated dream
    } else {
      // Create a new dream
      dream = new Dream({ userId, date, content });
      await dream.save();
      res.status(201).json(dream); // Return the new dream
    }

  } catch (error) {
    console.error('Error saving dream:', error);
    res.status(500).json({ message: 'Error saving dream' });
  }
};

module.exports = { createDream };
