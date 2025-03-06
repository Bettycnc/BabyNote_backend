const mongoose = require("mongoose");

const BabySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  name: { type: String, required: true },
  birthday: { type: Date, required: true },
  birthWeight: { type: Number, require: true },
  picture: String,
  elimination_id: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Elimination" },
  ],
  weight_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Weigth" }],
  temperature_id: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Temperature" },
  ],
  alimentation_id: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Alimentation" },
  ],
  care_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Care" }],
});

const Baby = mongoose.model("babies", BabySchema);

module.exports = Baby;
