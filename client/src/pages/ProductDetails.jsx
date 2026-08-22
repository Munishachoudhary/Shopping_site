import { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Form,
} from "react-bootstrap";

import {
  FaStar,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

import { useParams } from "react-router-dom";

import API from "../services/api";

import { CartContext } from "../context/CartContext";
import { useReviews } from "../context/ReviewContext";

import RelatedProducts from "../components/RelatedProducts";
import DeliveryInfo from "../components/DeliveryInfo";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useContext(CartContext);

  // Reviews
  const {
    addReview,
    getProductReviews,
    getAverageRating,
  } = useReviews();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Review states
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);

      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Get reviews for current product
  const productReviews = getProductReviews(id);

  // Average rating
  const averageRating = getAverageRating(id);

  // Submit Review
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    if (!reviewText.trim()) {
      alert("Please write a review");
      return;
    }

    // Get logged-in user
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const newReview = {
      id: Date.now(),
      name: user?.name || "Guest User",
      rating: rating,
      comment: reviewText,
      date: new Date().toLocaleDateString(),
    };

    addReview(id, newReview);

    // Reset form
    setRating(0);
    setReviewText("");
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  const discount =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) /
            product.oldPrice) *
            100
        )
      : 0;

  return (
    <Container className="my-5">

      {/* Product Details */}
      <Row>

        <Col md={5}>
          <Card>
            <Card.Img
              src={product.image}
              style={{
                height: "450px",
                objectFit: "cover",
              }}
            />
          </Card>
        </Col>

        <Col md={7}>

          <h2>{product.name}</h2>

          <p className="text-muted">
            {product.category}
          </p>

          {/* Rating */}
          <div className="mb-3">

            <FaStar className="text-warning" />

            <span className="ms-2">
              {averageRating > 0
                ? averageRating
                : product.rating}
            </span>

            <span className="text-muted ms-2">
              ({productReviews.length} Reviews)
            </span>

          </div>

          <h3>
            ₹{product.price}

            {product.oldPrice > product.price && (
              <span
                className="ms-3 text-muted"
                style={{
                  textDecoration: "line-through",
                }}
              >
                ₹{product.oldPrice}
              </span>
            )}
          </h3>

          {discount > 0 && (
            <Badge bg="danger">
              {discount}% OFF
            </Badge>
          )}

          <hr />

          <h5>Description</h5>

          <p>{product.description}</p>

          <h5>
            Stock :

            {product.stock > 0 ? (
              <Badge
                bg="success"
                className="ms-2"
              >
                In Stock
              </Badge>
            ) : (
              <Badge
                bg="danger"
                className="ms-2"
              >
                Out of Stock
              </Badge>
            )}
          </h5>

          <div className="mt-4">

            <Button
              variant="primary"
              className="me-3"
              disabled={product.stock === 0}
              onClick={() => addToCart(product._id)}
            >
              <FaShoppingCart className="me-2" />
              Add To Cart
            </Button>

            <Button variant="outline-danger">
              <FaHeart className="me-2" />
              Wishlist
            </Button>

          </div>

        </Col>

      </Row>

      {/* ==========================
          Reviews & Ratings
      ========================== */}

      <hr className="my-5" />

      <Row>

        <Col md={7}>

          <h3 className="mb-4">
            Customer Reviews ⭐
          </h3>

          {productReviews.length === 0 ? (

            <p className="text-muted">
              No reviews yet. Be the first to review!
            </p>

          ) : (

            productReviews.map((review) => (

              <Card
                key={review.id}
                className="mb-3 shadow-sm"
              >
                <Card.Body>

                  <div className="d-flex justify-content-between">

                    <strong>
                      {review.name}
                    </strong>

                    <small className="text-muted">
                      {review.date}
                    </small>

                  </div>

                  {/* Review Stars */}
                  <div className="my-2">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <FaStar
                          key={star}
                          className={
                            star <= review.rating
                              ? "text-warning"
                              : "text-muted"
                          }
                        />
                      )
                    )}

                  </div>

                  <p className="mb-0">
                    {review.comment}
                  </p>

                </Card.Body>
              </Card>

            ))

          )}

        </Col>

        {/* Add Review Form */}

        <Col md={5}>

          <Card className="shadow-sm">

            <Card.Body>

              <h4 className="mb-3">
                Write a Review
              </h4>

              <Form onSubmit={handleSubmitReview}>

                <Form.Group className="mb-3">

                  <Form.Label>
                    Your Rating
                  </Form.Label>

                  <div
                    style={{
                      fontSize: "28px",
                      cursor: "pointer",
                    }}
                  >

                    {[1, 2, 3, 4, 5].map(
                      (star) => (

                        <FaStar
                          key={star}
                          onClick={() =>
                            setRating(star)
                          }
                          className={
                            star <= rating
                              ? "text-warning"
                              : "text-muted"
                          }
                        />

                      )
                    )}

                  </div>

                </Form.Group>

                <Form.Group className="mb-3">

                  <Form.Label>
                    Your Review
                  </Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Write your experience..."
                    value={reviewText}
                    onChange={(e) =>
                      setReviewText(
                        e.target.value
                      )
                    }
                  />

                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                >
                  Submit Review
                </Button>

              </Form>

            </Card.Body>

          </Card>

        </Col>

      </Row>

      {/* Delivery Information */}
      <DeliveryInfo />

      {/* Related Products */}
      <RelatedProducts
        category={product.category}
        currentId={product._id}
      />

    </Container>
  );
}

export default ProductDetails;