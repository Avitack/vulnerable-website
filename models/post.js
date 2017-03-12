var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  pid: Number,
  title: String,
  content: String,
  author: String,
  score: Number,
});
var Post = mongoose.model('Post', postSchema);
module.exports = Post;
