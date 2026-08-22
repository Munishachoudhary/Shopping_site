import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaHeadset,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <>
      <Navbar />

      <main className="contact-page">

        {/* ================= HERO ================= */}
        <section className="contact-hero">
          <Container>
            <div className="contact-hero-content">

              <div className="hero-icon">
                <FaHeadset />
              </div>

              <span className="hero-small-title">
                WE'RE HERE TO HELP
              </span>

              <h1>
                Get In <span>Touch</span>
              </h1>

              <p>
                Have a question about your order or need some help?
                Our support team is always ready to assist you.
              </p>

            </div>
          </Container>
        </section>

        {/* ================= CONTACT CONTENT ================= */}
        <section className="contact-content">
          <Container>

            <Row className="g-4 align-items-stretch">

              {/* ================= LEFT SIDE ================= */}
              <Col lg={5}>

                <div className="contact-details">

                  <div className="section-title">
                    <span>CONTACT INFORMATION</span>
                    <h2>Let's talk</h2>
                    <p>
                      We're happy to answer your questions and
                      help you find exactly what you're looking for.
                    </p>
                  </div>

                  {/* Address */}
                  <div className="contact-detail-item">
                    <div className="contact-detail-icon">
                      <FaMapMarkerAlt />
                    </div>

                    <div>
                      <h5>Our Address</h5>
                      <p>
                        123 Shopping Street,
                        <br />
                        New Delhi, India
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="contact-detail-item">
                    <div className="contact-detail-icon">
                      <FaPhoneAlt />
                    </div>

                    <div>
                      <h5>Phone Number</h5>
                      <p>
                        +91 98765 43210
                        <br />
                        +91 98765 12345
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="contact-detail-item">
                    <div className="contact-detail-icon">
                      <FaEnvelope />
                    </div>

                    <div>
                      <h5>Email Address</h5>
                      <p>
                        support@shopease.com
                        <br />
                        help@shopease.com
                      </p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="contact-detail-item">
                    <div className="contact-detail-icon">
                      <FaClock />
                    </div>

                    <div>
                      <h5>Working Hours</h5>
                      <p>
                        Monday - Saturday
                        <br />
                        9:00 AM - 7:00 PM
                      </p>
                    </div>
                  </div>

                </div>

              </Col>

              {/* ================= RIGHT SIDE ================= */}
              <Col lg={7}>

                <div className="contact-form-wrapper">

                  <div className="form-heading">
                    <span>DROP US A MESSAGE</span>
                    <h2>How can we help?</h2>
                    <p>
                      Fill out the form below and our team will
                      get back to you as soon as possible.
                    </p>
                  </div>

                  {submitted && (
                    <div className="success-message">
                      ✓ Your message has been sent successfully!
                    </div>
                  )}

                  <Form onSubmit={handleSubmit}>

                    <Row>

                      {/* Name */}
                      <Col md={6}>
                        <Form.Group className="mb-4">

                          <Form.Label>
                            Your Name
                          </Form.Label>

                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                          />

                        </Form.Group>
                      </Col>

                      {/* Email */}
                      <Col md={6}>
                        <Form.Group className="mb-4">

                          <Form.Label>
                            Email Address
                          </Form.Label>

                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                          />

                        </Form.Group>
                      </Col>

                    </Row>

                    {/* Subject */}
                    <Form.Group className="mb-4">

                      <Form.Label>
                        Subject
                      </Form.Label>

                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is your message about?"
                        required
                      />

                    </Form.Group>

                    {/* Message */}
                    <Form.Group className="mb-4">

                      <Form.Label>
                        Your Message
                      </Form.Label>

                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message here..."
                        required
                      />

                    </Form.Group>

                    {/* Submit */}
                    <Button
                      type="submit"
                      className="send-message-btn"
                    >
                      Send Message
                      <FaPaperPlane />
                    </Button>

                  </Form>

                </div>

              </Col>

            </Row>

          </Container>
        </section>

        {/* ================= BOTTOM CTA ================= */}
        <section className="contact-cta">

          <Container>

            <div className="cta-box">

              <div>
                <span>NEED QUICK HELP?</span>

                <h2>
                  Our support team is just a message away.
                </h2>
              </div>

              <a
                href="mailto:support@shopease.com"
                className="cta-button"
              >
                Email Us
                <FaEnvelope />
              </a>

            </div>

          </Container>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Contact;