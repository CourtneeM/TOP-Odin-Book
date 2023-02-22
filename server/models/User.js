const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  friends: { type: Array, default: [], required: true },
  friend_requests: { type: Map, default: { sent: [], received: [] }, required: true },
  profile_picture: { type: String },
  about: { type: String, default: 'Add a little about yourself here.', required: true }
});

UserSchema.virtual("url").get(function() {
  return `${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);