const Comment = require("../moduls/Comments");
const { comment } = require("../utils/cloudinary");
const { responseFailed, responseSuccess } = require("../utils/response");
const Joi = require('joi')

const addCommentShcema = Joi.object({
  nama: Joi.string().max(255).required(),
  deskripsi: Joi.string().max(255).required(),
  rating: Joi.string().required()
})
const editCommentSchema = Joi.object({
  nama: Joi.string().max(255),
  deskripsi: Joi.string().max(255),
  rating: Joi.string(),
});

async function addComment(req, res) {
  try {
    const {error, value} = addCommentShcema.validate(req.body)
    if(error){
      return responseFailed(400, error.message, res)
    }
    const { nama, deskripsi, rating } = value
    const cloudinaryResult = await comment(req.file.buffer);

    const newComment = new Comment({
      nama: nama,
      deskripsi: deskripsi,
      rating: rating,
      image: cloudinaryResult.secure_url,
    });

    await newComment.save();
    responseSuccess(200, newComment, "berhasil menambah komentar", res);
  } catch (error) {
    responseFailed(500, error.message, res);
  }
}

async function deleteComment(req, res) {
  try {
    const { _id } = req.params;
    const comment = await Comment.findOne({ _id });

    if (!comment) {
     return responseFailed(400, "comment tidak ditemukan", res);
    }

    await comment.deleteOne({ _id });
    responseSuccess(200, null, "berhasil di hapus", res);
  } catch (error) {
    responseFailed(500, error.message, res);
  }
}

async function getComment(req, res){
    try {
        const comment = await Comment.find({})
        responseSuccess(200, comment, "data berhasil di ambil", res)
    } catch (error) {
        responseFailed(500, error.message, res)
    }
}

async function editComment(req, res) {
  try {
    const { error, value } = editCommentSchema.validate(req.body);
    if (error) {
      return responseFailed(400, error.message, res);
    }

    const { _id } = req.params;
    const comment = await Comment.findOne({ _id });

    if (!comment) {
      return responseFailed(400, "Data tidak ditemukan", res);
    }

    const { nama, deskripsi, rating } = value;

    if (nama !== undefined) {
      comment.nama = nama;
    }
    if (deskripsi !== undefined) {
      comment.deskripsi = deskripsi;
    }
    if (rating !== undefined) {
      comment.rating = rating;
    }

    await comment.save();

    responseSuccess(200, comment, "Data berhasil di edit", res);
  } catch (error) {
    responseFailed(500, error.message, res);
  }
}module.exports = {
  addComment,
  deleteComment,
  getComment,
  editComment
};
