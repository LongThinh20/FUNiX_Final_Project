const mongoose = require("mongoose");

const { Schema } = mongoose;

const checkLength = (value) => {
  if (value && value.length < 3 && value.length > 400) {
    return false;
  }
  return true;
};

const charitySchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: [checkLength]
  },
  image: { type: String, required: true },
  summary: {
    type: String,
    required: true,
    validate: [checkLength]
  },
  content: {
    type: String,
    required: true,
    validate: [checkLength]
  },
  userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  date: { type: Date, default: new Date() },
  expectedMoney: { type: Number, required: true },
  status: { type: String, default: "notStart", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  organization: { type: String, required: true, validate: [checkLength] }
});

module.exports = mongoose.model("Charity", charitySchema);
