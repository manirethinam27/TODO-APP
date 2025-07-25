const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    task: String
});

module.exports = mongoose.model("Task",listSchema);