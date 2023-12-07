const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_sellers",
      required: true
    },
    nama_produk: {
      type: String,
      required: true,
    },
    deskripsi: {
      type: String,
      required: true,
    },
    kategori: {
      type: String,
      required: true,
    },
    harga: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      default: null
    },
    cart_status:{
      type: String,
      default: "inactive",
      required: true
    },
    image:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Produk = mongoose.model("products", productSchema);

module.exports = Produk;
