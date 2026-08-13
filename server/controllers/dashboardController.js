import User from "../models/User.js";
import Product from "../models/product.js";
import Order from "../models/Order.js";

export const dashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const statusData = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const orderStatus = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };

    statusData.forEach((item) => {
      const key = item._id?.toLowerCase();

      if (orderStatus.hasOwnProperty(key)) {
        orderStatus[key] = item.count;
      }
    });

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: revenueData[0]?.totalRevenue || 0,
      orderStatus,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};