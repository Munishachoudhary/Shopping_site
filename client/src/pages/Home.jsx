import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
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

  const categories = [
    { name: "Ethnic Wear", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300" },
    { name: "Western Dresses", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300" },
    { name: "Menswear", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300" },
    { name: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300" },
    { name: "Home Decor", image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=300" },
    { name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300" },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300" }
  ];

  return (
    <div className="home-page">
      <NavbarComponent search={search} setSearch={setSearch} />
      <Hero />

      <section className="categories-section">
        <h3 className="heading">Categories</h3>
        <div className="container">
          <div className="categories-row">
            {categories.map((category, index) => (
              <div
                className="category-item"
                key={index}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="category-card">
                  <img src={category.image} alt={category.name} />
                </div>
                <p className="category-name">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Offers />

      <section className="home-section">
        <Container>
          <Row>
            <Col lg={3} md={4} className="sidebar-column">
              <CategorySidebar onCategorySelect={setSelectedCategory} />
            </Col>

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

      <Testimonials />
      <Footer />
    </div>
  );
}

export default Home;