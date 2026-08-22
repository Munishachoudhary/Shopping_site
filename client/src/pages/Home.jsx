import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

import {
  FaTshirt,
  FaFemale,
  FaMale,
  FaShoePrints,
  FaHome,
  FaSpa,
  FaGem,
} from "react-icons/fa";

import NavbarComponent from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySidebar from "../components/CategorySidebar";
import FeaturedProducts from "./FeaturedProducts";
import Offers from "./Offers";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

import "../styles/Home.css";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  /* =====================================================
     CATEGORIES
  ===================================================== */

  const categories = [
    {
      name: "Ethnic Wear",
      icon: <FaTshirt />,
    },
    {
      name: "Western Dresses",
      icon: <FaFemale />,
    },
    {
      name: "Menswear",
      icon: <FaMale />,
    },
    {
      name: "Footwear",
      icon: <FaShoePrints />,
    },
    {
      name: "Home Decor",
      icon: <FaHome />,
    },
    {
      name: "Beauty",
      icon: <FaSpa />,
    },
    {
      name: "Accessories",
      icon: <FaGem />,
    },
  ];

  return (
    <div className="home-page">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <NavbarComponent
        search={search}
        setSearch={setSearch}
      />


      {/* =================================================
          HERO
      ================================================= */}

      <Hero />


      {/* =================================================
          CATEGORIES
      ================================================= */}

      <section className="categories-section">

        <h3 className="heading">
          Categories
        </h3>

        <div className="container">

          <div className="categories-row">

            {categories.map((category) => (

              <div
                className="category-item"
                key={category.name}
                onClick={() =>
                  setSelectedCategory(category.name)
                }
              >

                {/* Circular Icon */}

                <div className="category-card">

                  {category.icon}

                </div>


                {/* Category Name */}

                <p className="category-name">
                  {category.name}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          OFFERS
      ================================================= */}

      <Offers />


      {/* =================================================
          PRODUCTS SECTION
      ================================================= */}

      <section className="home-section">

        <Container>

          <Row>

            {/* Sidebar */}

            <Col
              lg={3}
              md={4}
              className="sidebar-column"
            >
              <CategorySidebar
                onCategorySelect={setSelectedCategory}
              />
            </Col>


            {/* Products */}

            <Col lg={9} md={8}>

              <div className="products-column">

                <FeaturedProducts
                  search={search}
                  category={selectedCategory}
                />

              </div>

            </Col>

          </Row>

        </Container>

      </section>


      {/* =================================================
          TESTIMONIALS
      ================================================= */}

      <Testimonials />


      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

    </div>
  );
}

export default Home;