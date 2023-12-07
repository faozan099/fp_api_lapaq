const multer = require("multer");
const { addProduct, getAllProduk, getDetailProduk, getDetailKategori, deleteProduct, editProduct } = require("../../controller/ProductController");
const authenticateToken = require("../../middleware/Auth");
const router = require("express").Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/api/produk",[authenticateToken, upload.single("image")], addProduct);
router.get("/api/produk", getAllProduk);
router.get("/api/produk/:_id", getDetailProduk);
router.get("/api/produk/kategori/:kategori",[authenticateToken], getDetailKategori);
router.delete("/api/produk/:_id", [authenticateToken], deleteProduct);
router.put("/api/produk/:_id", [authenticateToken, upload.single("image")], editProduct);

module.exports = router;
