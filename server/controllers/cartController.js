import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    let cartItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user: req.user._id,
        product: productId,
        quantity: 1,
      });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user._id,
    }).populate("product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await Cart.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { quantity },
      { new: true }
    ).populate("product");

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.user._id });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
