const mongoose = require("mongoose");

const { Schema } = mongoose;

const checkLength = (value) => {
  return value && (value.length >= 10 || value.length <= 500);
};
function checkEndDate(value) {
  return value > this.startDate;
}

function checkExpectedMoney(value) {
  return value >= 5000000;
}

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
    min: 10
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: new Date() },
  expectedMoney: {
    type: Number,
    required: true,
    validate: [checkExpectedMoney]
  },
  status: { type: String, default: "notStart", required: true },
  startDate: { type: Date, required: true },
  endDate: {
    type: Date,
    required: true,
    validate: [checkEndDate, "EndDate must be  greater  than startDate"]
  },
  organization: { type: String, required: true, validate: [checkLength] }
});

module.exports = mongoose.model("Charity", charitySchema);
