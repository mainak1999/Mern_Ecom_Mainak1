const Cart = require("../models/cart.model.js");
const CartItem = require("../models/cartItem.model.js");
const Product = require("../models/product.model.js");
const User = require("../models/user.model.js");

async function createCart(user) {
  const cart = new Cart({ user });
  const createdCart = await cart.save();
  return createdCart;
}


async function findUserCart(userId) {
  let cart =await Cart.findOne({ user: userId })
  
  let cartItems=await CartItem.find({cart:cart._id}).populate("product")

  cart.cartItems=cartItems
  

  let totalPrice = 0;
  let totalDiscountedPrice = 0;
  let totalItem = 0;

  for (const cartItem of cart.cartItems) {
    totalPrice += cartItem.price;
    totalDiscountedPrice += cartItem.discountedPrice;
    totalItem += cartItem.quantity;
  }

  cart.totalPrice = totalPrice;
  cart.totalItem = totalItem;
  cart.totalDiscountedPrice = totalDiscountedPrice;
  cart.discounte = totalPrice - totalDiscountedPrice;

  const updatedCart = await cart.save();
  return cart;
}

async function addCartItem(userId, req) {
  try {
    const cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(req.productId);

    if (!cart || !product) {
      throw new Error("Cart or product not found.");
    }

    const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId });

    if (!isPresent) {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.discountedPrice,
        size: req.size,
        discountedPrice: product.discountedPrice,
      });
      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem);
      await updateCartTotalAttributes(cart);
      return createdCartItem;
    }
    
    return isPresent;
  } catch (error) {
    throw error; // Rethrow the error for global error handling or logging
  }
}

module.exports = { createCart, findUserCart, addCartItem };
