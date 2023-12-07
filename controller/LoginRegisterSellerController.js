const { responseFailed, responseSuccess } = require("../utils/response");
const { spaceSpam } = require("../utils/validations");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User_Seller = require("../moduls/UserSeller");
const Joi = require('joi');
const { uploadAvatar } = require("../utils/cloudinary");

const generatedToken = (user) => {
  const token = jwt.sign({user_id: user._id},'SECRET_KEY', {expiresIn:"1d"})
  return token
}

const registerSellerSchema = Joi.object({
  nama_toko: Joi.string().max(255).required(),
  alamat_toko: Joi.string().required(),
  email: Joi.string().email().required(),
  pin: Joi.string().length(6).pattern(/^[0-9]+$/).required()
})

const loginSallerSchema = Joi.object({
  email: Joi.string().email().required(),
  pin: Joi.string().length(6).pattern(/^[0-9]+$/).required()
})

async function registerSeller(req, res) {

  try {
    const {error, value} = registerSellerSchema.validate(req.body)
    if(error){
     return responseFailed(400, error.message, res)
    }
    const { nama_toko, alamat_toko, email, pin } = value;
    const file = req.file;
    let avatar = null;
    if (file) {
      const cloudinariResult = await uploadAvatar(file.buffer)
      avatar = cloudinariResult.secure_url 
    }
    

    const existingUser = await User_Seller.findOne({email})
    if(existingUser){
      return responseFailed(400, "email sudah terdaftar", res)
    }

    const hashPin = await bcrypt.hash(pin, 10)

    if (spaceSpam([pin])) {
      return responseFailed(500, "Harap masukan data dengan valid", res);
    }

    const newUser = new User_Seller({
      nama_toko: nama_toko,
      alamat_toko: alamat_toko,
      email: email,
      pin: hashPin,
      avatar: avatar
    });
    await newUser.save();

    const token = jwt.sign({ user_id: newUser._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });
    responseSuccess(200, { newUser, token }, `Berhasil membuat akun..`, res);
  } catch (error) {
    responseFailed(500, error.message, res);
  }
}

async function loginSaller(req, res) {
  try {
      const {error, value} = loginSallerSchema.validate(req.body)
      if(error){
        responseFailed(400, error.message, res)
      } 
      const {email, pin} = value
      const user = await User_Seller.findOne({ email });
      if (!user) {
          return responseFailed(400, "Kombinasi email, password, dan pin tidak valid", res);
      }

      const pinMatch = await bcrypt.compare(pin, user.pin);
      if (!pinMatch) {
          return responseFailed(400, "Kombinasi email, password, dan pin tidak valid", res);
      }

      const token = generatedToken(user);
      res.cookie('token', token, { httpOnly: true });

      responseSuccess(200, { user, token }, "Berhasil login", res);
  } catch (error) {
      responseFailed(500, error.message, res);
  }
}

module.exports = {
    registerSeller,
    loginSaller
}