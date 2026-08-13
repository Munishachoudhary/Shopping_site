import { Container, Row, Col, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import "../styles/Testimonials.css";

function Testimonials() {
  const reviews = [
    {
      name:"Rahul Sharma",
      review:"Amazing shopping experience. The products are excellent and delivery was very fast.",
      rating:5
    },
    {
      name:"Priya Singh",
      review:"I really loved the quality of the products. I will definitely shop again.",
      rating:5
    },
    {
      name:"Aman Verma",
      review:"Great prices, easy checkout and excellent customer service.",
      rating:4
    }
  ];

  return (
    <section className="testimonials-section">
      <Container>
        <h2 className="section-title">What Our Customers Say</h2>
        <Row className="g-4">
          {reviews.map((review,index)=>(
            <Col md={4} key={index}>
              <Card className="testimonial-card">
                <Card.Body>
                  <div className="review-stars">
                    {[...Array(review.rating)].map((_,i)=>(
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p>"{review.review}"</p>
                  <h5>{review.name}</h5>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Testimonials;