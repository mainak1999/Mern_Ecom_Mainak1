const cartService = require("../services/cart.service");

const findUserCart = async (req, res) => {
  try {
    const user = await req.user;
    const cart = await cartService.findUserCart(user._id);

    if (!cart) {
      return res.status(404).send({ error: "Cart not found" });
    }

    return res.status(200).send(cart);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const user = await req.user;
    const cartItem = await cartService.addCartItem(user._id, req.body);

    if (!cartItem) {
      return res.status(400).send({ error: "Failed to add item to cart" });
    }

    return res.status(200).send(cartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  findUserCart,
  addItemToCart
};
