import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import API from "../services/api";
import ProductCard from "./ProductCard";

function RelatedProducts({ category, currentId }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {

    const { data } = await API.get("/products");

    const related = data.filter(
      (item) =>
        item.category === category &&
        item._id !== currentId
    );

    setProducts(related.slice(0, 4));
  };

  return (
    <div className="mt-5">

      <h3>Related Products</h3>

      <Row>

        {products.map((product) => (

          <Col
            md={3}
            key={product._id}
          >

            <ProductCard product={product} />

          </Col>

        ))}

      </Row>

    </div>
  );
}

export default RelatedProducts;