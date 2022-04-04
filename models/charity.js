const mongoose = require("mongoose");

const { Schema } = mongoose;

const charitySchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  ExpDate: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  expectedMoney: { type: Number, required: true },
  timesDonate: {
    type: Number,
    default: 0
  },
  totalDonated: { type: Number, default: 0 },
  organizationId: [{ type: Schema.Types.ObjectId, ref: "Organization" }]
});

module.exports = mongoose.model("Charity", charitySchema);
