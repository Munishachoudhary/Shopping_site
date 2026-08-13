import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import "../styles/AllProduct.css";
import Navbar from "../components/Navbar"

function Product() {
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

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" />
            </div>
        );
    }
   return (
        <div className="all-products-page">

            <Navbar />

            <Container className="all-products-content">

                <h2 className="all-products-title">
                    All Products
                </h2>

                {products.length === 0 ? (
                    <Alert variant="warning" className="no-products">
                        No products found.
                    </Alert>
                ) : (
                    <Row className="product-row">
                        {products.map((product) => (
                            <Col
                                key={product._id}
                                lg={3}
                                md={4}
                                sm={6}
                                xs={12}
                                className="mb-4"
                            >
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                )}

            </Container>

        </div>
    );
}

export default Product;