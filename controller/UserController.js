const User = require("../moduls/UsersBuyer");
const { responseFailed, responseSuccess } = require("../utils/response");
const { spaceSpam } = require("../utils/validations");
const Joi = require('joi')

const editUserSchema = Joi.object({
  nama_depan: Joi.string().max(255),
  nama_belakang: Joi.string().max(255),
  email: Joi.string().email(),
  alamat: Joi.string().max(255),
});

async function getAllUsers(req, res) {
  try {
    const user = await User.find({});

    responseSuccess(200, user, "Data berhasil ditemukan", res);
  } catch (error) {
    responseFailed(400, error.message || "Terjadi kesalahan", res);
  }
}

async function getDetailUser(req, res) {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id });

    responseSuccess(200, user, "Data berhasil di tampilkan", res);
  } catch (error) {
    responseFailed(400, error.message, res);
  }
}

async function editUser(req, res) {
  try {
    const {error, value} = editUserSchema.validate(req.body)
    if(error){
      return responseFailed(400, error.message, res)
    }
    const { _id } = req.params;
    const user = await User.findOne({ _id });

    if (!user) {
      return responseFailed(400, "User tidak ditemukan", res);
    }

    const { nama_depan, nama_belakang, email, alamat } = value

    if (spaceSpam([nama_depan, nama_belakang, email])) {
      return responseFailed(400, "harap masukan data dengan benar", res);
    }

    

    if (nama_depan) {
      user.nama_depan = nama_depan;
    }
    if (nama_belakang) {
      user.nama_belakang = nama_belakang;
    }
    if (email) {
      user.email = email.toLowerCase();
    }
    if (alamat) {
      user.alamat = alamat;
    }

    await user.save();
    responseSuccess(200, user, "Berhasil di perbarui", res);
  } catch (error) {
    responseFailed(400, error.message, res);
  }
}

async function deleteUser(req, res) {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id });

    if (!user) {
      responseFailed(400, "User tidak dapat ditemukan", res);
    }

    await user.deleteOne({ _id });
    responseSuccess(200, null, "User berhasil di hapus", res);
  } catch (error) {
    responseFailed(400, error.message, res);
  }
}

module.exports = {
  getAllUsers,
  getDetailUser,
  editUser,
  deleteUser,
};
