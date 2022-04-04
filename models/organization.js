const mongoose = require("mongoose");

const { Schema } = mongoose;

const organizationSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
    require: true
  },
  description: { type: String, require: true },
  charityId: [{ type: mongoose.Types.ObjectId, ref: "Charity" }]
});

module.exports = mongoose.model("Organization", organizationSchema);
