import { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
} from "react-bootstrap";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { CartContext } from "../context/CartContext";
import RelatedProducts from "../components/RelatedProducts";
import DeliveryInfo from "../components/DeliveryInfo";

function ProductDetails() {

  const { id } = useParams();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

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

          <div className="mb-3">

            <FaStar className="text-warning" />

            <span className="ms-2">

              {product.rating}

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

              <Badge bg="success" className="ms-2">

                In Stock

              </Badge>

            ) : (

              <Badge bg="danger" className="ms-2">

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

      <DeliveryInfo />

      <RelatedProducts
        category={product.category}
        currentId={product._id}
      />

    </Container>
  );
}

export default ProductDetails;