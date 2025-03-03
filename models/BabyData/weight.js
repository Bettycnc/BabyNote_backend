const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema ({
    date: {type: Date, require: true},
    weight : {type: Number, require: true},
})
    
const Weight = mongoose.model('Weigth', weightSchema);

module.exports = Weight;