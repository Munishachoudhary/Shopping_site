import { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load product");
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(`/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Updated Successfully");

      navigate("/admin/products");

    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="d-flex">

      <AdminSidebar />

      <Container className="p-4">

        <Card className="shadow p-4">

          <h2 className="mb-4">Edit Product</h2>

          <Form onSubmit={updateProduct}>

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
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={product.rating}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="warning">
              Update Product
            </Button>

          </Form>

        </Card>

      </Container>

    </div>
  );
}

export default EditProduct;