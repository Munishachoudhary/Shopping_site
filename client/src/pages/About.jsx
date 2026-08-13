import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaShoppingBag,
  FaShippingFast,
  FaLock,
  FaHeadset,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/About.css";

function About() {
  return (
    <>
      <Navbar />

      <div className="about-page">
        <Container>

          <div className="about-header">
            <h1>About ShopEase</h1>
            <p>
              Welcome to ShopEase, your trusted online shopping destination.
              We offer quality products at affordable prices with fast
              delivery and secure shopping.
            </p>
          </div>

          <Row className="my-5">

            <Col lg={6}>
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45b?w=900"
                alt="About ShopEase"
                className="about-image"
              />
            </Col>

            <Col lg={6}>
              <h2>Who We Are</h2>

              <p>
                ShopEase is an online shopping platform designed to make
                shopping simple, secure, and enjoyable. We bring together
                quality products from trusted brands, making it easy for
                customers to shop from anywhere.
              </p>

              <p>
                Our mission is to provide excellent customer service,
                competitive prices, and a seamless shopping experience.
              </p>
            </Col>

          </Row>

          <h2 className="text-center mb-4">
            Why Choose Us
          </h2>

          <Row>

            <Col md={3} sm={6} className="mb-4">
              <Card className="feature-card">
                <Card.Body>
                  <FaShoppingBag className="feature-icon" />
                  <h5>Quality Products</h5>
                  <p>Wide range of genuine products from trusted brands.</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} className="mb-4">
              <Card className="feature-card">
                <Card.Body>
                  <FaShippingFast className="feature-icon" />
                  <h5>Fast Delivery</h5>
                  <p>Quick and reliable shipping to your doorstep.</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} className="mb-4">
              <Card className="feature-card">
                <Card.Body>
                  <FaLock className="feature-icon" />
                  <h5>Secure Payment</h5>
                  <p>100% safe and secure payment methods.</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} className="mb-4">
              <Card className="feature-card">
                <Card.Body>
                  <FaHeadset className="feature-icon" />
                  <h5>24/7 Support</h5>
                  <p>Friendly customer support whenever you need help.</p>
                </Card.Body>
              </Card>
            </Col>

          </Row>

        </Container>
      </div>

      <Footer />
    </>
  );
}

export default About;