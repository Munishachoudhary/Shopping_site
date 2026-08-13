import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="gy-4">
          <Col lg={4} md={6}>
            <h2 className="footer-logo">ShopEase</h2>
            <p className="footer-text">Your one-stop online shopping destination for electronics, fashion, furniture and more.</p>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaYoutube /></a>
            </div>
          </Col>
          <Col lg={2} md={6}>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/categories">Categories</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/orders">My Orders</a></li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h5>Customer Service</h5>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Return Policy</a></li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h5>Contact Us</h5>
            <p><FaMapMarkerAlt className="contact-icon" /> Chandigarh, India</p>
            <p><FaPhone className="contact-icon" /> +91 98765 43210</p>
            <p><FaEnvelope className="contact-icon" /> support@shopease.com</p>
          </Col>
        </Row>
        <Row className="newsletter-section">
          <Col md={6}>
            <h5>Subscribe to our Newsletter</h5>
            <p>Get the latest offers and updates directly in your inbox.</p>
          </Col>
          <Col md={6}>
            <Form className="newsletter-form">
              <Form.Control type="email" placeholder="Enter your email" />
              <Button variant="warning">Subscribe</Button>
            </Form>
          </Col>
        </Row>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ShopEase. All Rights Reserved.</p>
          <p>Made with ❤️ for online shopping</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;