const mongoose = require('mongoose');
const { Schema } = mongoose;

const bgPaintingSchema = new Schema({
    title: { type: String, required: true, unique: true },
    includedTime: { type: Date, default: Date.now },
    author: String,
    description: String,
    library: String,
    image: { type: String, required: true }

});

module.exports = mongoose.model('bgPainting', bgPaintingSchema);