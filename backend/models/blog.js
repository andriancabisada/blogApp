const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogId: {
    type: String,
  },

  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  authorId: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
