import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaUsers,
  FaShoppingBag,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminSidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h3 className="text-center mb-4">
        Admin Panel
      </h3>

      <Nav className="flex-column">

        <Nav.Link
          as={Link}
          to="/admin"
          className="text-white"
        >
          <FaTachometerAlt className="me-2" />
          Dashboard
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/admin/products"
          className="text-white"
        >
          <FaBoxOpen className="me-2" />
          Products
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/admin/users"
          className="text-white"
        >
          <FaUsers className="me-2" />
          Users
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/admin/orders"
          className="text-white"
        >
          <FaShoppingBag className="me-2" />
          Orders
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/login"
          className="text-danger"
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </Nav.Link>

      </Nav>
    </div>
  );
}

export default AdminSidebar;