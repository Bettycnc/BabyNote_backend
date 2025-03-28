const mongoose = require('mongoose');

const temperatureSchema = new mongoose.Schema ({
    date: { type: Date, require: true},
    temperature: {type: Number, require: true},
})

const Temperature = mongoose.model('Temperature', temperatureSchema);

module.exports = Temperature;