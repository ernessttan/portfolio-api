const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{ type: String, required: true }]
});

module.exports = mongoose.model('Project', projectSchema);