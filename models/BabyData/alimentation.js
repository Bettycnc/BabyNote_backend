const mongoose = require('mongoose');

const complementSchema = new mongoose.Schema({
    foodSupplementPresent: { type: Boolean, default: false },
    nameFoodSupplement: { type: String, required: true },
    amount: { type: Number, required: true, min: 0, max: 150 },
    method: { type: String, required: true }
});

const breastFeedingSchema = new mongoose.Schema({
    breastFeedingPresent: { type: Boolean, default: false },
    breast: [{ type: String, required: true }],
    duration: { type: Number, required: true },
    foodSupplement: [complementSchema]
});

const feedingBottleSchema = new mongoose.Schema({
    feedingBottlePresent: { type: Boolean, default: false },
    amount: { type: Number, required: true, min: 0, max: 150 }
});

const AlimentationSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    feedingBottle: [feedingBottleSchema],
    breastFeeding: [breastFeedingSchema]
});

const Alimentation = mongoose.model('Alimentation', AlimentationSchema);

module.exports = Alimentation;
