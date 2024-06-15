const mongoose = require('mongoose');

const DreamSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    content: { type: String, required: true }
});

module.exports = mongoose.model('Dream', DreamSchema);