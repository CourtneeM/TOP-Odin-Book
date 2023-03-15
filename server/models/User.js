const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  friends: { type: Array, default: [], required: true },
  friend_requests: { type: Map, default: { sent: [], received: [] }, required: true },
  profile_picture: {
    type: Map,
    default: {
      selected: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
      images: [
        'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
        'https://www.citypng.com/public/uploads/small/11639961100oflqsg0lqmroihxbbfffckhnw2crcvlavp4dyhu8jk63aqzzduaeyb8x5s5c3zbt92n0oqolewqpgwlq9lcnr72mhhfichlamz4c.png',
        'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png',
        'https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png',
        'https://icon-library.com/images/my-profile-icon-png/my-profile-icon-png-2.jpg'
      ]
    },
  },
  about: { type: String, default: 'Add a little about yourself here.', required: true }
});

UserSchema.virtual("url").get(function() {
  return `${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);