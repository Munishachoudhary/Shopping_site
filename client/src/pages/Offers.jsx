import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaCopy, FaTag, FaGift } from "react-icons/fa";

function Offers() {
  const offers = [
    {
      code: "WELCOME10",
      title: "Welcome Offer",
      description: "Get 10% OFF on your first order",
      discount: "10% OFF",
    },
    {
      code: "SAVE200",
      title: "Save ₹200",
      description: "Get ₹200 OFF on orders above ₹2,000",
      discount: "₹200 OFF",
    },
    {
      code: "FREESHIP",
      title: "Free Delivery",
      description: "Get free delivery on orders above ₹999",
      discount: "FREE SHIPPING",
    },
  ];

  const copyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    alert(`${code} copied successfully!`);
  };

  return (
    <Container className="my-5">
      {/* Heading */}
      <div className="text-center mb-5">
        <Badge bg="danger" className="mb-2">
          <FaGift className="me-2" />
          SPECIAL OFFERS
        </Badge>

        <h1>Offers & Coupons 🎉</h1>

        <p className="text-muted">
          Save more with our exclusive discount coupons!
        </p>
      </div>

      {/* Offer Cards */}
      <Row>
        {offers.map((offer) => (
          <Col
            key={offer.code}
            lg={4}
            md={6}
            className="mb-4"
          >
            <Card className="h-100 shadow-sm border-0 offer-card">
              <Card.Body className="text-center p-4">

                <div className="offer-icon mb-3">
                  <FaTag />
                </div>

                <Badge bg="danger" className="mb-3">
                  {offer.discount}
                </Badge>

                <Card.Title>
                  {offer.title}
                </Card.Title>

                <Card.Text className="text-muted">
                  {offer.description}
                </Card.Text>

                <div className="coupon-code">
                  {offer.code}
                </div>

                <Button
                  variant="outline-primary"
                  className="w-100 mt-3"
                  onClick={() =>
                    copyCoupon(offer.code)
                  }
                >
                  <FaCopy className="me-2" />
                  Copy Coupon
                </Button>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Offers;