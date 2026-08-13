import { Carousel, Button, Container } from "react-bootstrap";
import "../styles/Hero.css";

function Hero() {
  return (
    <Carousel fade interval={3000}>

      {/* Slide 1 */}

      <Carousel.Item>
        <img
          className="d-block w-100 hero-img"
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
          alt="Summer Sale"
        />

        <Carousel.Caption className="hero-content">

          <span className="offer">🔥 Up to 50% OFF</span>

          <h1>Summer Sale</h1>

          <p>
            Upgrade your wardrobe with the latest fashion trends.
          </p>

          <Button variant="warning" size="lg">
            Shop Now
          </Button>

        </Carousel.Caption>

      </Carousel.Item>

      {/* Slide 2 */}

      <Carousel.Item>

        <img
          className="d-block w-100 hero-img"
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600"
          alt="Electronics"
        />

        <Carousel.Caption className="hero-content">

          <span className="offer">⚡ New Arrival</span>

          <h1>New Electronics Collection</h1>

          <p>
            Smartphones, laptops, headphones and much more.
          </p>

          <Button variant="primary" size="lg">
            Explore
          </Button>

        </Carousel.Caption>

      </Carousel.Item>

      {/* Slide 3 */}

      <Carousel.Item>

        <img
          className="d-block w-100 hero-img"
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600"
          alt="Fashion"
        />

        <Carousel.Caption className="hero-content">

          <span className="offer">👗 Trending</span>

          <h1>Fashion Sale</h1>

          <p>
            Discover premium fashion at amazing prices.
          </p>

          <Button variant="danger" size="lg">
            Buy Now
          </Button>

        </Carousel.Caption>

      </Carousel.Item>

      {/* Slide 4 */}

      <Carousel.Item>

        <img
          className="d-block w-100 hero-img"
          src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1600"
          alt="Laptops"
        />

        <Carousel.Caption className="hero-content">

          <span className="offer">💻 Best Deals</span>

          <h1>Laptops & Accessories</h1>

          <p>
            High-performance laptops for work, gaming and study.
          </p>

          <Button variant="success" size="lg">
            View Collection
          </Button>

        </Carousel.Caption>

      </Carousel.Item>

      {/* Slide 5 */}

      <Carousel.Item>

        <img
          className="d-block w-100 hero-img"
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600"
          alt="Furniture"
        />

        <Carousel.Caption className="hero-content">

          <span className="offer">🏠 New Collection</span>

          <h1>Home & Furniture Deals</h1>

          <p>
            Beautiful furniture for every room in your home.
          </p>

          <Button variant="light" size="lg">
            Shop Furniture
          </Button>

        </Carousel.Caption>

      </Carousel.Item>

    </Carousel>
  );
}

export default Hero;