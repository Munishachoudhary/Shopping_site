import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "",
    stock: "",
    image: "",
    rating: 4.5,
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/products", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Added Successfully");

      navigate("/admin/products");

    } catch (error) {
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />

      <Container className="p-4">

        <Card className="shadow p-4">

          <h2 className="mb-4">Add Product</h2>

          <Form onSubmit={submitHandler}>

            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Old Price</Form.Label>
              <Form.Control
                type="number"
                name="oldPrice"
                value={product.oldPrice}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
              />
            </Form.Group>

            <Button type="submit" variant="success">
              Add Product
            </Button>

          </Form>

        </Card>

      </Container>
    </div>
  );
}

export default AddProduct;