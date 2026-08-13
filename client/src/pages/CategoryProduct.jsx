import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

function CategoryProducts() {

  const { category } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetchProducts();

  }, [category]);

  const fetchProducts = async () => {

    const { data } = await API.get("/products");

    const filtered = data.filter(
      (item) =>
        item.category.toLowerCase() ===
        decodeURIComponent(category).toLowerCase()
    );

    setProducts(filtered);

  };

  return (
    <Container className="my-5">

      <h2 className="mb-4">

        {decodeURIComponent(category)}

      </h2>

      <Row>

        {products.map((product) => (

          <Col
            lg={3}
            md={4}
            sm={6}
            xs={12}
            key={product._id}
          >

            <ProductCard product={product} />

          </Col>

        ))}

      </Row>

    </Container>
  );
}

export default CategoryProducts;