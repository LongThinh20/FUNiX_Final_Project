const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  phoneNumber: { type: String },
  password: { type: String },
  role: {
    type: String,
    default: "user"
  },
  charityList: [
    {
      charityId: { type: Schema.Types.ObjectId, ref: "Charity" },
      donate: { type: Number, default: 0 }
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
