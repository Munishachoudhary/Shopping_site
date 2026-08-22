import { Container, Row, Col, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <Container className="py-5">
      <h2 className="mb-4">My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your wishlist is empty 🤍</h4>

          <p className="text-muted">
            Add your favorite products to the wishlist.
          </p>
        </div>
      ) : (
        <Row>
          {wishlist.map((product) => (
            <Col
              key={product._id}
              lg={3}
              md={4}
              sm={6}
              className="mb-4"
            >
              <ProductCard product={product} />

              <Button
                variant="danger"
                className="w-100 mt-2"
                onClick={() =>
                  removeFromWishlist(product._id)
                }
              >
                <FaTrash className="me-2" />
                Remove
              </Button>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Wishlist;