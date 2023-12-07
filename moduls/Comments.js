const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    deskripsi: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true
    },
    image:{
      type: String,
      required: false,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
