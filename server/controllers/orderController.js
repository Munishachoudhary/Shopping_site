import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { sendEmail } from '../utils/sendEmail.js';

export const placeOrder = async (req, res) => {
  try {
    console.log("ORDER BODY:", req.body);
    console.log("USER:", req.user);

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body;

    // Validate order items
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        message: "No order items found",
      });
    }

    // Validate shipping address
    if (
      !shippingAddress?.fullName ||
      !shippingAddress?.phone ||
      !shippingAddress?.address ||
      !shippingAddress?.city ||
      !shippingAddress?.state ||
      !shippingAddress?.pincode
    ) {
      return res.status(400).json({
        message: "Please fill all shipping address fields",
      });
    }

    // Validate total
    if (totalPrice === undefined || totalPrice === null) {
      return res.status(400).json({
        message: "Total price is required",
      });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || "Cash on Delivery",
      totalPrice,
    });

    const createdOrder = await order.save();

    console.log("ORDER CREATED:", createdOrder._id);

    // Clear cart
    await Cart.deleteMany({
      user: req.user._id,
    });

    // Send email separately so email failure does NOT make order fail
    try {
      if (req.user.email) {
        await sendEmail(
          req.user.email,
          "Order Confirmation",
          `
            <h2>Thank you for your order!</h2>
            <p>Your order has been placed successfully.</p>
            <p><strong>Order ID:</strong> ${createdOrder._id}</p>
            <p><strong>Total:</strong> ₹${createdOrder.totalPrice}</p>
            <p>We will notify you when your order is shipped.</p>
          `
        );
      }
    } catch (emailError) {
      console.error("EMAIL ERROR:", emailError.message);
    }

    // IMPORTANT:
    // Do not use order.user.email here because order.user is ObjectId.

    res.status(201).json(createdOrder);

  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
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

    const order = await Order.findById(req.params.id)
      .populate("user", "email name");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = status;

    const updatedOrder = await order.save();

    // Send email separately
    try {
      if (order.user?.email) {
        if (status === "Shipped") {
          await sendEmail(
            order.user.email,
            "Your Order Has Been Shipped",
            `
              <h2>Your order has been shipped!</h2>
              <p>Order ID: ${order._id}</p>
            `
          );
        }

        if (status === "Delivered") {
          await sendEmail(
            order.user.email,
            "Order Delivered",
            `
              <h2>Your order has been delivered!</h2>
              <p>Order ID: ${order._id}</p>
              <p>Thank you for shopping with us!</p>
            `
          );
        }
      }
    } catch (emailError) {
      console.error("STATUS EMAIL ERROR:", emailError.message);
    }

    res.json({
      message: "Order Status Updated Successfully",
      order: updatedOrder,
    });

  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};