import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/Offers.css";

function Offers() {
  return (
    <section className="offers-section">
      <Container>
        <h2 className="section-title">Special Offers</h2>
        <Row className="g-4">
          <Col md={6}>
            <Card className="offer-card offer-one">
              <Card.Body>
                <span>🔥 Limited Time Offer</span>
                <h2>Up to 50% OFF</h2>
                <p>Get amazing discounts on your favorite products.</p>
                <button>Shop Now</button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="offer-card offer-two">
              <Card.Body>
                <span>⚡ Special Deal</span>
                <h2>Electronics Sale</h2>
                <p>Grab the latest electronics at the best prices.</p>
                <button>Explore Now</button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Offers;