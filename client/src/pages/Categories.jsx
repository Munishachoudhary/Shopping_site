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
    {
      name: "Mobiles",
      icon: <FaMobileAlt />,
    },
    {
      name: "Laptops",
      icon: <FaLaptop />,
    },
    {
      name: "Electronics",
      icon: <FaTv />,
    },
    {
      name: "Men's Fashion",
      icon: <FaTshirt />,
    },
    {
      name: "Women's Fashion",
      icon: <FaFemale />,
    },
    {
      name: "Shoes",
      icon: <FaShoePrints />,
    },
    {
      name: "Watches",
      icon: <FaClock />,
    },
    {
      name: "Books",
      icon: <FaBook />,
    },
    {
      name: "Beauty",
      icon: <FaSpa />,
    },
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName.toLowerCase()}`);
  };

  return (
    <>
      <Navbar />

      <main className="categories-page">
        <Container>

          {/* Page Heading */}
          <div className="categories-header">

            <h2 className="categories-title">
              Shop by Category
            </h2>

            <p className="categories-subtitle">
              Explore our wide range of products
            </p>

          </div>


          {/* Category Cards */}
          <Row className="g-4">

            {categories.map((category) => (

              <Col
                lg={4}
                md={6}
                sm={6}
                xs={12}
                key={category.name}
              >

                <Card
                  className="category-card"
                  onClick={() =>
                    handleCategoryClick(category.name)
                  }
                >

                  <Card.Body>

                    {/* Circular React Icon */}
                    <div className="category-icon">
                      {category.icon}
                    </div>


                    {/* Category Name */}
                    <h5>
                      {category.name}
                    </h5>


                    {/* Explore */}
                    <span className="category-link">
                      Explore Products →
                    </span>

                  </Card.Body>

                </Card>

              </Col>

            ))}

          </Row>

        </Container>
      </main>

      <Footer />
    </>
  );
}

export default Categories;