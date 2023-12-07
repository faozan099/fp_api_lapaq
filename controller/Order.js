const Produk = require("../moduls/Products");
const User = require("../moduls/UsersBuyer");
const { responseFailed, responseSuccess } = require("../utils/response");
const mongoose = require("mongoose");
const { Order } = require("../moduls/Order");
const User_Seller = require("../moduls/UserSeller");
const { Cart } = require("../moduls/Cart");

async function addOrder(req, res){
    try {
        const {user_buyer_id, user_seller_id, product_id, metode_pembayaran} = req.body

        const existingBuyer = await User.findOne({_id: user_buyer_id})
        if(!existingBuyer){
           return responseFailed(400, "id buyer tidak ditemukan", res)
        }

        const user = await User.findById(user_buyer_id)
        const alamat_user = user.alamat

        const existingSeller = await User_Seller.findOne({_id: user_seller_id})
        if(!existingSeller){
            return responseFailed(400, "id seller tidak ditemukan", res)
        }
        
        const existingProduct = await Produk.findOne({_id: product_id})
        if(!existingProduct){
            return responseFailed(400, "id seller tidak ditemukan", res)
        }
        const product = await Produk.findById(product_id)
        const harga = parseFloat(product.harga)
        const ongkir = 10000
        const total = harga + ongkir
        
        if(!metode_pembayaran){
            return responseFailed(400, "pilih metode pembayaran", res)
        }
        const randomAngka = Math.floor(Math.random() * 99999999999)
        const newOrderData = {
            user_buyer_id: new mongoose.Types.ObjectId(user_buyer_id),
            alamat_user: alamat_user,
            user_seller_id: new mongoose.Types.ObjectId(user_seller_id),
            product_id: new mongoose.Types.ObjectId(product_id),
            harga: harga.toString(),
            total: total.toString(),
            metode_pembayaran: metode_pembayaran,
            kode_transaksi: randomAngka
        } 
        const newOrder = new Order(newOrderData);
        await newOrder.save();

        const cart = await Cart.findOne({
            produk_id: new mongoose.Types.ObjectId(product_id),
            user_buyer_id: new mongoose.Types.ObjectId(user_buyer_id)
        })
        console.log(product_id, user_buyer_id)
        console.log(cart)
        if (cart){
            cart.status_cart = "inactive"
            await cart.save()
        }

        responseSuccess(200, newOrder, "success", res)
    } catch (error) {
     responseFailed(500, error.message, res)   
    }
}

async function getOrderUser(req, res){
    try {
        const {user_buyer_id} = req.params
        const orderUser = await Order.find({user_buyer_id})
        if(!orderUser || orderUser.length === 0){
            return responseFailed(400, "id tidak ada", res)
        }
        responseSuccess(200, orderUser, "data berhasil ditampilkan", res)
    } catch (error) {
        responseFailed(500, error.message, res)
    }
}

async function getOrderSeller(req, res){
    try {
        const {user_seller_id} = req.params
        const orderSeller = await Order.find({user_seller_id})
        if(!orderSeller || orderSeller.length === 0){
            return responseFailed(400, "id tidak ada", res)
        }
        responseSuccess(200, orderSeller, "data berhasil ditampilkan", res)
    } catch (error) {
        responseFailed(500, error.message, res)
    }
}

module.exports = {
    addOrder,
    getOrderUser,
    getOrderSeller
}