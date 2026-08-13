import { useContext } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/Cart.css";

function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (!cart || cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <div className="empty-cart">
          <FaShoppingCart size={60} className="text-muted mb-3" />
          <h3>Your Cart is Empty</h3>
          <p className="text-muted">Looks like you haven't added anything yet.</p>
          <Button variant="primary" onClick={() => navigate("/products")}>
            <FaArrowLeft className="me-2" />
            Continue Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="mb-0">
          <FaShoppingCart className="me-2" />
          Shopping Cart
          <span className="text-muted ms-2 fs-6">({getTotalItems()} items)</span>
        </h2>
        <Button variant="outline-primary" onClick={() => navigate("/products")}>
          <FaArrowLeft className="me-2" />
          Continue Shopping
        </Button>
      </div>

      <Row>
        <Col lg={8}>
          {cart.map((item) => (
            <Card className="cart-item mb-3 shadow-sm" key={item._id}>
              <Card.Body className="d-flex align-items-center">
                <div className="cart-item-img me-3">
                  <Card.Img
                    src={
                      item.product?.image ||
                      "https://via.placeholder.com/100x100?text=No+Image"
                    }
                    alt={item.product?.name}
                  />
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <Link
                        to={`/product/${item.product?._id}`}
                        className="text-decoration-none"
                      >
                        <h5 className="mb-1">{item.product?.name}</h5>
                      </Link>
                      <small className="text-muted">
                        {item.product?.category}
                      </small>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </Button>
                      <Badge bg="light" text="dark" className="mx-2 px-3 py-2 fs-6">
                        {item.quantity}
                      </Badge>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        <FaPlus />
                      </Button>
                    </div>
                    <h5 className="mb-0">
                      ₹{(item.product?.price || 0) * item.quantity}
                    </h5>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col lg={4}>
          <Card className="order-summary shadow-sm">
            <Card.Body>
              <h4 className="mb-4">Order Summary</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Items ({getTotalItems()})</span>
                <span>₹{getSubtotal()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <strong>₹{getSubtotal()}</strong>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-100"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
