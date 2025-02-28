const mongoose = require('mongoose');

const SoinsSchema = new mongoose.Schema({
    date: {type: Date, required: true },
    cordCare: {type: Boolean,default:false},
    faceCare: {type: Boolean,default:false},
    bath: {type: Boolean,default:false},
})

const Weigth = mongoose.model('weigth', weightSchema);

module.exports = Weigth;