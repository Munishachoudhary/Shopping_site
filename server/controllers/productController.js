import Product from "../models/product.js";

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Product
export const getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      oldPrice,
      category,
      stock,
      image,
      rating,
    } = req.body;

    // Validation
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !stock ||
      !image
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      oldPrice,
      category,
      stock,
      image,
      rating: rating || 4.5,
    });

    res.status(201).json({
      message: "Product Added Successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.oldPrice = req.body.oldPrice;
    product.category = req.body.category;
    product.stock = req.body.stock;
    product.image = req.body.image;
    product.rating = req.body.rating;

    const updatedProduct = await product.save();

    res.json(updatedProduct);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addReview = async (req, res) => {
  try {

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You already reviewed this product",
      });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce(
        (acc, item) => acc + item.rating,
        0
      ) / product.reviews.length;

    await product.save();

    res.status(201).json({
      message: "Review Added Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const getReviews = async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product.reviews);

};

export const updateReview = async (req, res) => {
  try {

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    const review = product.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    review.rating = rating;
    review.comment = comment;

    product.rating =
      product.reviews.reduce(
        (acc, item) => acc + item.rating,
        0
      ) / product.reviews.length;

    await product.save();

    res.json({
      message: "Review Updated",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const deleteReview = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    const review = product.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    review.deleteOne();

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.length === 0
        ? 0
        : product.reviews.reduce(
            (acc, item) => acc + item.rating,
            0
          ) / product.reviews.length;

    await product.save();

    res.json({
      message: "Review Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};