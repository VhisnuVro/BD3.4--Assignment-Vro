const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
let cors = require('cors');

app.use(cors());
app.use(express.static('static'));

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];
let addProducts = (cart, productId, name, price, quantity) => {
  let item = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  cart.push(item);
  return cart;
};
//Endpoint 1: Add an Item to the Cart
app.get('/cart/add', (req, res) => {
  let productId = parseFloat(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseFloat(req.query.quantity);
   cart = addProducts(cart, productId, name, price, quantity);
  res.json({ cartItems: cart });
});

// Endpoint 2: Edit Quantity of an Item in the Cart
let updateQuantity = (cart, productId, quantity) => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
};
app.get('/cart/edit', (req, res) => {
  let productId = parseFloat(req.query.productId);
  let quantity = parseFloat(req.query.quantity);
   cart = updateQuantity(cart, productId, quantity);
  res.json({ cartItems: cart });
});
let removeProduct = (item, productId) => {
  return item.productId !== productId;
};
//Endpoint 3: Delete an Item from the Cart
app.get('/cart/delete', (req, res) => {
  let productId = parseFloat(req.query.productId);
  cart = cart.filter((item) => removeProduct(item, productId));
  res.json({ cartItems: cart });
});

//Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

//Endpoint 5: Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity', (req, res) => {
  res.json({ totalQuantity: cart.length });
});

//Endpoint 6: Calculate Total Price of Items in the Cart
let checkTotal = (cart) => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
};

app.get('/cart/total-price', (req, res) => {
  let totalPrice = checkTotal(cart);
  res.json({ totalPrice: totalPrice });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
