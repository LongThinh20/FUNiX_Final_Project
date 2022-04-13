const mongoose = require("mongoose");

const { Schema } = mongoose;

const charitySchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: [checkLength, "Chuỗi lớn hơn 10 kí tự"]
  },
  image: { type: String, required: true },
  summary: {
    type: String,
    required: true,
    validate: [checkLength, "Chuỗi lớn hơn 10 kí tự"]
  },
  content: {
    type: String,
    required: true,
    validate: [checkLength, "Chuỗi lớn hơn 10 kí tự"]
  },
  userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  date: { type: Date, default: new Date() },
  expectedMoney: { type: Number, required: true },
  status: { type: String, default: "notStart", required: true },
  startDate: { type: Date, default: true },
  endDate: { type: Date, default: true },
  organization: { type: String }
});

module.exports = mongoose.model("Charity", charitySchema);

function checkLength(value) {
  return value.length > 3;
}
