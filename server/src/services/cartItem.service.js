const userService = require("../services/user.service");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model")


// Update an existing cart item
async function updateCartItem(userId, cartItemId, cartItemData) {
    const item = await findCartItemById(cartItemId)
    // console.log("cartItemData ",item)
  
    if(!item){
      throw new Error("cart item not found : ",cartItemId)
    }
    const user = await userService.findUserById(item.userId);
  
    if(!user){
      throw new Error("user not found : ",userId)
    }
  
   
  
    if (user.id === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
  
      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("You can't update another user's cart_item");
    }
  }
  



async function removeCartItem(userId, cartItemId) {
    console.log(`userId - ${userId}, cartItemId - ${cartItemId}`);
    
    const cartItem = await findCartItemById(cartItemId);
    const user = await userService.findUserById(cartItem.userId);
    const reqUser = await userService.findUserById(userId);
    console.log("cart item id",cartItemId)
  
    if (user.id === reqUser.id) {
      await CartItem.findByIdAndDelete(cartItem.id);
    } else {
      throw new Error("can not remove cart item");
    }
  }

async function findCartItemById(cartItemId) {
    const cartItem = await CartItem.findById(cartItemId).populate("product");
    if (cartItem) {
        return cartItem
    } else {
        throw new Error("cartItem not found with Id ", cartItemId);
    }


}
module.exports = {
    updateCartItem,
    removeCartItem,
    findCartItemById

}