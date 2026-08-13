import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Table,
  Badge,
  Button,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrder(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const printInvoice = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="d-flex">
        <AdminSidebar />
        <Container className="text-center mt-5">
          <Spinner animation="border" />
        </Container>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="d-flex">
        <AdminSidebar />
        <Container className="mt-5">
          <h3>Order Not Found</h3>
        </Container>
      </div>
    );
  }

  return (
    <div className="d-flex">

      <AdminSidebar />

      <Container className="p-4">

        <h2 className="mb-4">
          Order Details
        </h2>

        <Row>

          <Col md={6}>

            <Card className="mb-4 shadow">

              <Card.Body>

                <h4>Customer Information</h4>

                <hr />

                <p><strong>Name:</strong> {order.user?.name}</p>

                <p><strong>Email:</strong> {order.user?.email}</p>

              </Card.Body>

            </Card>

          </Col>

          <Col md={6}>

            <Card className="mb-4 shadow">

              <Card.Body>

                <h4>Shipping Address</h4>

                <hr />

                <p>{order.shippingAddress?.fullName}</p>

                <p>{order.shippingAddress?.phone}</p>

                <p>{order.shippingAddress?.address}</p>

                <p>
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.state}
                </p>

                <p>{order.shippingAddress?.pincode}</p>

              </Card.Body>

            </Card>

          </Col>

        </Row>

        <Card className="shadow mb-4">

          <Card.Body>

            <h4>Ordered Products</h4>

            <Table responsive bordered hover>

              <thead>

                <tr>

                  <th>Image</th>

                  <th>Product</th>

                  <th>Price</th>

                  <th>Qty</th>

                  <th>Total</th>

                </tr>

              </thead>

              <tbody>

                {order.orderItems.map((item) => (

                  <tr key={item._id}>

                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        width="60"
                      />
                    </td>

                    <td>{item.name}</td>

                    <td>₹{item.price}</td>

                    <td>{item.quantity}</td>

                    <td>
                      ₹{item.price * item.quantity}
                    </td>

                  </tr>

                ))}

              </tbody>

            </Table>

          </Card.Body>

        </Card>

        <Row>

          <Col md={6}>

            <Card className="shadow">

              <Card.Body>

                <h4>Payment</h4>

                <hr />

                <p>
                  <strong>Method:</strong>{" "}
                  {order.paymentMethod}
                </p>

                <p>
                  <strong>Total:</strong>{" "}
                  ₹{order.totalPrice}
                </p>

              </Card.Body>

            </Card>

          </Col>

          <Col md={6}>

            <Card className="shadow">

              <Card.Body>

                <h4>Status</h4>

                <hr />

                <Badge bg="primary" className="p-2">
                  {order.orderStatus}
                </Badge>

              </Card.Body>

            </Card>

          </Col>

        </Row>

        <div className="mt-4">

          <Button
            variant="success"
            onClick={printInvoice}
          >
            Print Invoice
          </Button>

        </div>

      </Container>

    </div>
  );
}

export default OrderDetails;