## Final-Project (Back End Web Dev)

---

### How To Run

- npm init --y
- npm install
- npm rub dev

### Library

- Node JS
- Express JS
- MongoDB
- Cloudinary
- Cookie-Parser
- Nodemon
- Bcrypt
- JWT (JSON Web Token)
- Body-Parser
- Dotenv
- Cors
- joi
- mongoose
- multer

---

### End Point

#### User Buyer

<summary><code>POST</code> <code><b>/</b></code> <code>/register</code></summary>
<summary><code>POST</code> <code><b>/</b></code> <code>/login</code></summary>
<summary><code>GET</code> <code><b>/</b></code> <code>/api/users</code></summary>
<summary><code>GET</code> <code><b>/</b></code> <code>/api/users/:_id</code></summary>
<summary><code>PATCH</code> <code><b>/</b></code> <code>/api/users/:_id</code></summary>
<summary><code>DELETE</code> <code><b>/</b></code> <code>/api/users/:_id</code></summary>

#### User Seller

<summary><code>POST</code> <code><b>/</b></code> <code>/register/seller</code></summary>
<summary><code>POST</code> <code><b>/</b></code> <code>/login/seller</code></summary>
<summary><code>GET</code> <code><b>/</b></code> <code>/users/seller</code></summary>
<summary><code>GET</code> <code><b>/</b></code> <code>/users/seller/:_id</code></summary>
<summary><code>PATCH</code> <code><b>/</b></code> <code>/users/seller/:_id</code></summary>
<summary><code>DELETE</code> <code><b>/</b></code> <code>/users/seller/:_id</code></summary>

#### Produk

<summary><code>GET</code> <code><b>/</b></code> <code>/api/produk</code></summary>
<summary><code>GET</code> <code><b>/</b></code> <code>/api/produk/:_id</code></summary>
<summary><code>GET</code> <code><b>/</b></code> <code>/api/produk/kategori/:kategori</code></summary>
<summary><code>POST</code> <code><b>/</b></code> <code>/api/produk</code></summary>
<summary><code>PUT</code> <code><b>/</b></code> <code>/api/produk/:_id</code></summary>
<summary><code>DELETE</code> <code><b>/</b></code> <code>/api/produk/:_id</code></summary>

#### Cart

<summary><code>POST</code> <code><b>/</b></code> <code>/produk/cart</code></summary>
<summary><code>GET</code> <code><b>/</b></code> <code>/produk/cart/:user_buyer_id</code></summary>
<summary><code>DELETE</code> <code><b>/</b></code> <code>/produk/cart/:_id</code></summary>

#### Order

<summary><code>POST</code> <code><b>/</b></code> <code>/product/order</code></summary>
<summary><code>GET</code> <code><b>/</b></code> <code>/product/order/:user_buyer_id</code></summary>
<summary><code>GET</code> <code><b>/</b></code> <code>/product/order/:user_seller_id</code></summary>

#### Comment

<summary><code>POST</code> <code><b>/</b></code> <code>/comment</code></summary>
<summary><code>GET</code> <code><b>/</b></code> <code>/comment</code></summary>
<summary><code>PATCH</code> <code><b>/</b></code> <code>/comment/:_id</code></summary>
<summary><code>DELETE</code> <code><b>/</b></code> <code>/comment/:_id</code></summary>
