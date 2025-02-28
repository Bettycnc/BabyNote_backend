const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema ({
    date: {type: Date, require: true},
    weight : {type: Number, require: true},
})
    
const Weigth = mongoose.model('weigth', weightSchema);

module.exports = Weigth;