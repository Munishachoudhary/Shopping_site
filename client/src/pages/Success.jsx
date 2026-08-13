import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Success() {
  return (
    <Container className="text-center mt-5">

      <h1 className="text-success">
        🎉 Order Placed Successfully!
      </h1>

      <p>
        Thank you for shopping with us.
      </p>

      <Button as={Link} to="/products">
        Continue Shopping
      </Button>

    </Container>
  );
}

export default Success;