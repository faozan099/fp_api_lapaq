const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    nama_depan: {
      type: String,
      required: true,
    },
    nama_belakang: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nik: {
      type: String,
      require: true,
    },
    alamat: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
