const User = require("../moduls/UsersBuyer");
const { responseFailed, responseSuccess } = require("../utils/response");
const { spaceSpam } = require("../utils/validations");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require('joi')

const registerSchema = Joi.object({
  nama_depan: Joi.string().max(255).required(),
  nama_belakang: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  nik: Joi.string().length(16).pattern(/^[0-9]+$/).required(),
  alamat: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

async function register(req, res) {

  try {
    const { error, value } = registerSchema.validate(req.body);

    if(error){
      return responseFailed(400, error.message, res)
    }

    const { nama_depan, nama_belakang, email, password, nik, alamat } = value;

    const existingUser = await User.findOne({email})
    if(existingUser){
      return responseFailed(400, "email sudah terdaftar", res)
    }

    const existingNik = await User.findOne({nik})
    if(existingNik){
      return responseFailed(400, "nik sudah terdaftar", res)
    }

    const hashPassword = await bcrypt.hash(password, 10);
    if (spaceSpam([nama_depan, nama_belakang, email, password])) {
      return responseFailed(400, "Harap masukan data dengan valid", res);
    }

    if (typeof nik !== "string" || nik.length !== 16) {
    return responseFailed(400, "NIK tidak sesuai atau harus berisi 16 karakter", res);
    }

    const newUser = new User({
      nama_depan: nama_depan,
      nama_belakang: nama_belakang,
      email: email.toLowerCase(),
      password: hashPassword,
      nik: nik,
      alamat: alamat
    });
    await newUser.save();

    const token = jwt.sign({ user_id: newUser._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });
    responseSuccess(200, { newUser, token }, `Berhasil membuat akun..`, res);
  } catch (error) {
    responseFailed(400, error.message, res);
  }
}
const generatedToken = (user) => {
  const token = jwt.sign({user: user},'SECRET_KEY', {expiresIn:"1d"})
  return token
}

async function login(req, res) {
  try {
    const {error, value} = loginSchema.validate(req.body)

    if(error){
      return responseFailed(400, error.message, res)
    }

    const {email, password} = value
    const user = await User.findOne({email})
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!user) {
      return responseFailed(401, "Email atau password tidak ditemukan", res);
    }
    if (!passwordMatch) {
      return responseFailed(401, "Email atau password tidak ditemukan", res);
    }
    
    const token = generatedToken(user)
    res.cookie('token', token);
    responseSuccess(200, {user, token}, "Login berhasil", res);
  } catch (error) {
    console.log(error)
    responseFailed(500, "terjadi kesalahan server", res)
  }
}

module.exports = {
  register,
  login
};
