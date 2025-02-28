const mongoose = require('mongoose');

const EliminationSchema = new mongoose.Schema({
    date: { type: Date, require: true},
    urine: { type: Boolean, default: false },
    gambling: { type: Boolean, default: false }
});
    
const Elimination = mongoose.model('elimination', EliminationSchema);

module.exports = Elimination;
