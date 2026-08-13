import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaMobileAlt,
  FaLaptop,
  FaTv,
  FaTshirt,
  FaFemale,
  FaShoePrints,
  FaClock,
  FaBook,
  FaSpa,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Categories.css";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    { name: "Mobiles", icon: <FaMobileAlt /> },
    { name: "Laptops", icon: <FaLaptop /> },
    { name: "Electronics", icon: <FaTv /> },
    { name: "Men's Fashion", icon: <FaTshirt /> },
    { name: "Women's Fashion", icon: <FaFemale /> },
    { name: "Shoes", icon: <FaShoePrints /> },
    { name: "Watches", icon: <FaClock /> },
    { name: "Books", icon: <FaBook /> },
    { name: "Beauty", icon: <FaSpa /> },
  ];

  return (
    <>
      <Navbar />

      <div className="categories-page">
        <Container>

          <h2 className="categories-title">
            Shop by Category
          </h2>

          <Row className="g-4">
            {categories.map((category, index) => (
              <Col lg={4} md={6} sm={6} xs={12} key={index}>

                <Card
                  className="category-card"
                  onClick={() =>
                    navigate(`/category/${category.name.toLowerCase()}`)
                  }
                >
                  <Card.Body>
                    <div className="category-icon">
                      {category.icon}
                    </div>

                    <h5>{category.name}</h5>
                  </Card.Body>
                </Card>

              </Col>
            ))}
          </Row>

        </Container>
      </div>

      <Footer />
    </>
  );
}

export default Categories;