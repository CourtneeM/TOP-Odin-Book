const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  message: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: String, default: new Date(), required: true },
  likes: { type: Array, default: [], required: true },
  post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true }
});

CommentSchema.virtual("url").get(function() {
  return `${this._id}`;
});

module.exports = mongoose.model("Comment", CommentSchema);