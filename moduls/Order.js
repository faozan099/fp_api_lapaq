const { string } = require("joi");
const mongoose = require("mongoose");

const orderShema = mongoose.Schema(
  {
    user_buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    alamat_user:{
      type: String,
    },
    user_seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_sellers",
      required: true
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true
    },
    harga:{
      type: String,
    },
    total:{
      type: String
    },
    metode_pembayaran:{
      type: String,
      required: true
    },
    status_order:{
      type: String,
      default: "complete"
    },
    kode_transaksi: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true,
  }
);

exports.Order = mongoose.model("Order", orderShema);
