import { Card, Button, Badge } from "react-bootstrap";
import {
  FaHeart,
  FaRegHeart,
  FaEye,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import "../styles/Product.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

  // Cart
  const { addToCart } = useContext(CartContext);

  // Wishlist
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const wishlistProduct = isInWishlist(product._id);

  const handleWishlist = () => {
    if (wishlistProduct) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  // Discount
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) /
            product.oldPrice) *
            100
        )
      : 0;

  return (
    <Card className="product-card h-100 shadow-sm">

      {/* Discount Badge */}
      {discount > 0 && (
        <Badge
          bg="danger"
          className="position-absolute m-2"
        >
          {discount}% OFF
        </Badge>
      )}

      {/* Wishlist */}
      <div
        className="wishlist"
        onClick={handleWishlist}
        style={{ cursor: "pointer" }}
      >
        {wishlistProduct ? (
          <FaHeart className="text-danger" />
        ) : (
          <FaRegHeart />
        )}
      </div>

      {/* Image */}
      <Card.Img
        variant="top"
        src={
          product.image ||
          "https://via.placeholder.com/300x250?text=No+Image"
        }
        alt={product.name}
        style={{
          height: "220px",
          objectFit: "cover",
        }}
      />

      <Card.Body className="d-flex flex-column">

        <small className="text-muted">
          {product.category}
        </small>

        <Card.Title className="mt-2">
          {product.name}
        </Card.Title>

        <div className="rating mb-2">
          <FaStar className="text-warning" />

          <span className="ms-1">
            {product.rating || 4.5}
          </span>
        </div>

        <h5>
          ₹{product.price}

          {product.oldPrice > product.price && (
            <span
              className="text-muted ms-2"
              style={{
                textDecoration: "line-through",
                fontSize: "16px",
              }}
            >
              ₹{product.oldPrice}
            </span>
          )}
        </h5>

        {/* Stock */}
        <div className="mb-3">
          {product.stock > 0 ? (
            <Badge bg="success">
              In Stock ({product.stock})
            </Badge>
          ) : (
            <Badge bg="danger">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-auto d-flex justify-content-between">

          <Button
            variant="primary"
            onClick={() => addToCart(product._id)}
            disabled={product.stock <= 0}
          >
            <FaShoppingCart className="me-2" />
            Add Cart
          </Button>

          <Button
            variant="outline-dark"
            onClick={() =>
              navigate(`/product/${product._id}`)
            }
          >
            <FaEye />
          </Button>

        </div>

      </Card.Body>

    </Card>
  );
}

export default ProductCard;