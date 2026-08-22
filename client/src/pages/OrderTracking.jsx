import { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

import {
  FaBox,
  FaCheckCircle,
  FaTruck,
  FaHome,
} from "react-icons/fa";

import "../styles/OrderTracking.css";

function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [showTracking, setShowTracking] = useState(false);

  const handleTrackOrder = (e) => {
    e.preventDefault();

    if (!orderId.trim()) {
      alert("Please enter your Order ID");
      return;
    }

    setShowTracking(true);
  };

  return (
    <div className="tracking-page">

      <Container className="py-5">

        {/* Heading */}
        <div className="text-center mb-5">
          <h1>Track Your Order 📦</h1>

          <p className="text-muted">
            Enter your Order ID to check the delivery status.
          </p>
        </div>

        {/* Search Order */}
        <Card className="tracking-search shadow-sm border-0">
          <Card.Body className="p-4">

            <Form onSubmit={handleTrackOrder}>

              <Form.Group>
                <Form.Label>
                  Order ID
                </Form.Label>

                <div className="d-flex gap-2">

                  <Form.Control
                    type="text"
                    placeholder="Enter your Order ID"
                    value={orderId}
                    onChange={(e) =>
                      setOrderId(e.target.value)
                    }
                  />

                  <Button
                    type="submit"
                    variant="primary"
                  >
                    Track
                  </Button>

                </div>

              </Form.Group>

            </Form>

          </Card.Body>
        </Card>

        {/* Tracking Result */}
        {showTracking && (

          <Card className="tracking-result shadow-sm border-0 mt-4">
            <Card.Body className="p-4">

              <Alert variant="info">
                Tracking Order: <strong>{orderId}</strong>
              </Alert>

              <h4 className="mb-4">
                Order Status
              </h4>

              <div className="tracking-steps">

                {/* Step 1 */}
                <div className="tracking-step completed">

                  <div className="tracking-icon">
                    <FaCheckCircle />
                  </div>

                  <div>
                    <h5>Order Placed</h5>
                    <p>
                      Your order has been successfully placed.
                    </p>
                  </div>

                </div>

                {/* Step 2 */}
                <div className="tracking-step completed">

                  <div className="tracking-icon">
                    <FaBox />
                  </div>

                  <div>
                    <h5>Order Packed</h5>
                    <p>
                      Your order is packed and ready for shipping.
                    </p>
                  </div>

                </div>

                {/* Step 3 */}
                <div className="tracking-step active">

                  <div className="tracking-icon">
                    <FaTruck />
                  </div>

                  <div>
                    <h5>Shipped</h5>
                    <p>
                      Your order is on the way.
                    </p>
                  </div>

                </div>

                {/* Step 4 */}
                <div className="tracking-step">

                  <div className="tracking-icon">
                    <FaTruck />
                  </div>

                  <div>
                    <h5>Out for Delivery</h5>
                    <p>
                      Your order will be delivered soon.
                    </p>
                  </div>

                </div>

                {/* Step 5 */}
                <div className="tracking-step">

                  <div className="tracking-icon">
                    <FaHome />
                  </div>

                  <div>
                    <h5>Delivered</h5>
                    <p>
                      Your order has been delivered.
                    </p>
                  </div>

                </div>

              </div>

            </Card.Body>
          </Card>

        )}

      </Container>

    </div>
  );
}

export default OrderTracking;