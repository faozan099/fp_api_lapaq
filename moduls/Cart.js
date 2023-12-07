const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    user_buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    produk_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true
    },
    nama_produk: {
      type: String,
    },
    harga: {
      type: String,  
    },
    image: {
      type: String, 
    },
    status_cart:{
      type: String,
      default: "active"
    }
  },
  {
    timestamps: true,
  }
);

exports.Cart = mongoose.model("Cart", cartSchema);
