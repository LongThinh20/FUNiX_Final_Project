const mongoose = require("mongoose");

const { Schema } = mongoose;

const charitySchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  date: { type: Date, default: new Date() },
  expectedMoney: { type: Number, required: true },
  timesDonate: {
    type: Number,
    default: 0
  },
  startDate: { type: Date, default: true },
  endDate: { type: Date, default: true },
  organization: { type: String }
});

module.exports = mongoose.model("Charity", charitySchema);
