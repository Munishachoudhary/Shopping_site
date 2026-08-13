import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Contact.css";

function Contact() {
  return (
    <>
      <Navbar />

      <div className="contact-page">
        <Container>

          <div className="contact-header">
            <h1>Contact Us</h1>
            <p>
              We'd love to hear from you. Send us your questions,
              feedback, or suggestions.
            </p>
          </div>

          <Row className="g-4">

            <Col lg={5}>

              <Card className="contact-info-card">

                <Card.Body>

                  <h3>Get In Touch</h3>

                  <div className="contact-info">
                    <FaMapMarkerAlt className="contact-icon" />
                    <div>
                      <h6>Address</h6>
                      <p>123 Shopping Street, New Delhi, India</p>
                    </div>
                  </div>

                  <div className="contact-info">
                    <FaPhoneAlt className="contact-icon" />
                    <div>
                      <h6>Phone</h6>
                      <p>+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="contact-info">
                    <FaEnvelope className="contact-icon" />
                    <div>
                      <h6>Email</h6>
                      <p>support@shopease.com</p>
                    </div>
                  </div>

                  <div className="contact-info">
                    <FaClock className="contact-icon" />
                    <div>
                      <h6>Working Hours</h6>
                      <p>Mon - Sat : 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>

                </Card.Body>

              </Card>

            </Col>

            <Col lg={7}>

              <Card className="contact-form-card">

                <Card.Body>

                  <h3 className="mb-4">Send a Message</h3>

                  <Form>

                    <Row>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your name"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter your email"
                          />
                        </Form.Group>
                      </Col>

                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter subject"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Write your message..."
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-100"
                    >
                      Send Message
                    </Button>

                  </Form>

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

export default Contact;