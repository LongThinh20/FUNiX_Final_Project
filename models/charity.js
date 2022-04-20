const mongoose = require("mongoose");

const { Schema } = mongoose;

const checkLength = (value) => {
  if (value && value.length < 3 && value.length > 500) {
    return false;
  }
  return true;
};
function checkEndDate(value) {
  if (value <= this.startDate) {
    return false;
  }
  return true;
}

const charitySchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: [checkLength, "Tiêu de"]
  },
  image: { type: String, required: true },
  summary: {
    type: String,
    required: true,
    validate: [checkLength, "tom tat"]
  },
  content: {
    type: String,
    required: true,
    validate: [checkLength, "noi dung"]
  },
  userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  date: { type: Date, default: new Date() },
  expectedMoney: { type: Number, required: true },
  status: { type: String, default: "notStart", required: true },
  startDate: { type: Date, required: true },
  endDate: {
    type: Date,
    required: true,
    validate: [checkEndDate, "endDate must be  greater  than startDate"]
  },
  organization: { type: String, required: true, validate: [checkLength] }
});

module.exports = mongoose.model("Charity", charitySchema);
