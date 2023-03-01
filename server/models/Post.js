const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  message: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: String, default: () => new Date(), required: true },
  likes: { type: Array, default: [], required: true },
});

PostSchema.virtual("url").get(function() {
  return `${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);