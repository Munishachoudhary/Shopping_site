import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Checkout() {

  const navigate = useNavigate();

  const { cart, clearCart } = useContext(CartContext);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const placeOrder = async (e) => {
    if (e) e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      await API.post(
        '/orders',
        {
          orderItems: cart.map(item => ({
            product: item.product._id,
            name: item.product.name,
            image: item.product.image,
            price: item.product.price,
            quantity: item.quantity,
          })),
          shippingAddress,
          paymentMethod,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await clearCart();
      alert('Order placed successfully');
      navigate('/products');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Order failed');
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col lg={8}>

          <Card className="shadow p-4">

            <h3 className="mb-4">
              Shipping Address
            </h3>

            <Form onSubmit={placeOrder}>

              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Row>

                <Col>

                  <Form.Group className="mb-3">

                    <Form.Label>City</Form.Label>

                    <Form.Control
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleChange}
                      required
                    />

                  </Form.Group>

                </Col>

                <Col>

                  <Form.Group className="mb-3">

                    <Form.Label>State</Form.Label>

                    <Form.Control
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleChange}
                      required
                    />

                  </Form.Group>

                </Col>

              </Row>

              <Form.Group className="mb-3">

                <Form.Label>Pincode</Form.Label>

                <Form.Control
                  name="pincode"
                  value={shippingAddress.pincode}
                  onChange={handleChange}
                  required
                />

              </Form.Group>

              <h4 className="mt-4">
                Payment Method
              </h4>

              <Form.Check
                type="radio"
                label="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={() =>
                  setPaymentMethod("Cash on Delivery")
                }
              />

              <Form.Check
                type="radio"
                label="Online Payment"
                checked={paymentMethod === "Online Payment"}
                onChange={() =>
                  setPaymentMethod("Online Payment")
                }
              />

              <Button
                className="mt-4"
                variant="success"
                type="submit"
                onClick={placeOrder}
              >
                Place Order
              </Button>

            </Form>

          </Card>

        </Col>

        {/* Summary */}

        <Col lg={4}>

          <Card className="shadow p-4">

            <h3>Order Summary</h3>

            <hr />

            <h5>
              Shipping :
              <span className="float-end text-success">
                FREE
              </span>
            </h5>

            <h5>
              Payment :
              <span className="float-end">
                {paymentMethod}
              </span>
            </h5>

            <Button
              variant="primary"
              className="w-100 mt-4"
              onClick={placeOrder}
            >
              Place Order
            </Button>

          </Card>

        </Col>

      </Row>
    </Container>
  );
}

export default Checkout;