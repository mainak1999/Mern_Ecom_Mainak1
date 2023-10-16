const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItem = require("../models/orderItems.js");
const cartService = require("../services/cart.service.js");

async function createOrder(user, shippingAddress) {
  try {
    let address;

    if (shippingAddress._id) {
      let existedAddress = await Address.findById(shippingAddress._id);
      address = existedAddress;
    } else {
      address = new Address(shippingAddress);
      address.user = user;
      await address.save();

      if (!user.addresses) {
        user.addresses = [];
      }

      user.addresses.push(address);
      await user.save();
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    for (const item of cart.cartItems) {
      // Make sure to provide the 'product' field when creating OrderItem
      const orderItem = new OrderItem({
        price: item.price,
        product: item.product, 
        quantity: item.quantity,
        size: item.size,
        userId: item.userId,
        discountedPrice: item.discountedPrice,
      });

      const createdOrderItem = await orderItem.save();
      orderItems.push(createdOrderItem);
    }
  
    const createdOrder = new Order({
      user,
      orderItems,
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      discounte: cart.discounte,
      totalItem: cart.totalItem,
      shippingAddress: address,
      orderDate: new Date(),
      orderStatus: "PENDING",
      "paymentDetails.status": "PENDING",
      createdAt: new Date(),
    });

    const savedOrder = await createdOrder.save();

    for (const item of orderItems) {
      item.order = savedOrder;
      await item.save();
    }

    return savedOrder;
  } catch (error) {
    throw new Error("Error creating order: " + error.message);
  }
}


async function placedOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";
  return await order.save();
}

async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIRMED";
  return await order.save();
}

async function shipOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "SHIPPED";
  return await order.save();
}

async function deliveredOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "DELIVERED";
  return await order.save();
}

async function cancelledOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CANCELLED"; // Assuming OrderStatus is a string enum or a valid string value
  return await order.save();
}

async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({path:"orderItems", populate:{path:"product"}})
    .populate("shippingAddress");
  
  return order;
}

async function usersOrderHistory(userId) {
  try {
    const orders = await Order.find({
      user: userId,
      orderStatus: "PLACED",
    })
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
        },
      })
      .lean();


    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOrders() {
  try {
    const orders = await Order.find().populate({
      path: "orderItems",
      populate: {
        path: "product",
      },
    }).lean();

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  if(!order)throw new Error("order not found with id ",orderId)

  await Order.findByIdAndDelete(orderId);
}

module.exports = {
  createOrder,
  placedOrder,
  confirmedOrder,
  shipOrder,
  deliveredOrder,
  cancelledOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
};
