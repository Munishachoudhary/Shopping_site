import { useEffect, useState } from "react";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import "../styles/featuredProduct.css";

function FeaturedProducts({ category = "", search = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !category ||
      product.category?.toLowerCase() === category.toLowerCase();

    const matchesSearch =
      !search ||
      product.name?.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <section className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{category || "All Products"}</h2>
        {category && (
          <span className="text-muted">
            {filteredProducts.length} Products
          </span>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <Alert variant="warning">
          No products found.
        </Alert>
      ) : (
        <Row>
          {filteredProducts.map((product) => (
            <Col
              key={product._id}
              lg={6}
              md={6}
              sm={6}
              xs={12}
              className="mb-4"
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </section>
  );
}

export default FeaturedProducts;