const mongoose = require("mongoose");

const { Schema } = mongoose;

const donationSchema = new Schema({
  charityId: [{ type: Schema.Types.ObjectId, ref: "Charity" }],
  userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  date: { type: Date, required: true },
  money: { type: Number, required: true },
  status: { type: Boolean, default: false }
});

module.exports = mongoose.model("Donation", donationSchema);
