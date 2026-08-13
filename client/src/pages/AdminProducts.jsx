import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-products">

      <AdminSidebar />

      <Container fluid className="admin-products-content">

        <div className="admin-products-header">

          <h2>Manage Products</h2>

          <Button
            as={Link}
            to="/admin/products/add"
            className="add-product-btn"
          >
            + Add Product
          </Button>

        </div>

        <div className="products-table">

          <Table hover responsive>

            <thead>

              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {products.length > 0 ? (

                products.map((product) => (

                  <tr key={product._id}>

                    <td>

                      <img
                        src={
                          product.image ||
                          "https://via.placeholder.com/70"
                        }
                        alt={product.name}
                        className="product-image"
                      />

                    </td>

                    <td>{product.name}</td>

                    <td>
                      <strong>₹{product.price}</strong>
                    </td>

                    <td>{product.category}</td>

                    <td>

                      {product.stock > 0 ? (
                        <span className="badge bg-success">
                          {product.stock}
                        </span>
                      ) : (
                        <span className="badge bg-danger">
                          Out of Stock
                        </span>
                      )}

                    </td>

                    <td>

                      <Button
                        as={Link}
                        to={`/admin/products/edit/${product._id}`}
                        variant="warning"
                        size="sm"
                        className="edit-btn"
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        className="delete-btn"
                        onClick={() =>
                          deleteProduct(product._id)
                        }
                      >
                        Delete
                      </Button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="no-products"
                  >
                    No Products Found
                  </td>

                </tr>

              )}

            </tbody>

          </Table>

        </div>

      </Container>

    </div>
  );
}

export default AdminProducts;