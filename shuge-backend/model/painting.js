const mongoose = require('mongoose');
const { Schema } = mongoose;

const paintingSchema = new Schema({
    category: String,
    title: { type: String, required: true, unique: true },
    includedTime: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    description: String,
    image: { type: String, required: true }

});

module.exports = mongoose.model('Painting', paintingSchema);