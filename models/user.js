const mongoose = require("mongoose");

const { Schema } = mongoose;

function checkEmail(value) {
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  return regex.test(value);
  x;
}
function checkPhone(value) {
  return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(value);
}
function checkUserName(value) {
  let regex = new RegExp("^[A-Za-z][A-Za-z0-9_]{7,29}$");
  return regex.test(value);
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: [checkEmail, "Invalid Email!!"],
    unique: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String, required: true, default: null },
  phone: {
    type: String,
    required: true,
    validate: [checkPhone, "Invalid Phone!"]
  },
  tokens: {
    type: [String],
    default: []
  },
  role: {
    type: String,
    default: "user"
  },
  status: { type: Boolean, default: false }
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.tokens;

  return user;
};

module.exports = mongoose.model("User", userSchema);
