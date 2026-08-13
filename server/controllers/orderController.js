import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { sendEmail } from '../utils/sendEmail.js';

export const placeOrder = async (req, res) => {
  try {
    console.log(req.body);

    const order = new Order({
      user: req.user._id,
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      totalPrice: req.body.totalPrice,
    });

    const createdOrder = await order.save();

    await Cart.deleteMany({ user: req.user._id });

    await sendEmail(
      req.user.email,
      'Order Confirmation',
      `
    <h2>Thank you for your order!</h2>
    <p>Your order has been placed successfully.</p>
    <p><strong>Order ID:</strong> ${createdOrder._id}</p>
    <p><strong>Total:</strong> ₹${createdOrder.totalPrice}</p>
    <p>We will notify you when your order is shipped.</p>
  `
    );
    if (req.body.status === 'Shipped') {
      await sendEmail(
        order.user.email,
        'Your order has been shipped',
        `
      <h2>Order Shipped</h2>
      <p>Your order <strong>${order._id}</strong> has been shipped.</p>
      <p>It will reach you soon.</p>
    `
      );
    }

    if (req.body.status === 'Delivered') {
      await sendEmail(
        order.user.email,
        'Order Delivered',
        `
      <h2>Order Delivered</h2>
      <p>Your order <strong>${order._id}</strong> has been delivered.</p>
      <p>Thank you for shopping with us!</p>
    `
      );
    }
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('PLACE ORDER ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(orders)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderItems.product", "name image price");

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    res.json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Order Status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id).populate('user', 'email name');

    order.orderStatus = status;
    await order.save();

    if (status === 'Shipped') {
      await sendEmail(
        order.user.email,
        'Your Order Has Been Shipped',
        '<h2>Your order has been shipped!</h2>'
      );
    }

    if (status === 'Delivered') {
      await sendEmail(
        order.user.email,
        'Order Delivered',
        '<h2>Your order has been delivered!</h2>'
      );
    }

    const updatedOrder = await order.save();

    res.json({
      message: "Order Status Updated Successfully",
      order: updatedOrder,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};