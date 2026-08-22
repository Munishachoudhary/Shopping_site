import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Badge,
  NavDropdown,
} from "react-bootstrap";

import { Link } from "react-router-dom";

import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaHome,
  FaStore,
  FaSignOutAlt,
  FaHeart,
  FaBox,
  FaPhone,
} from "react-icons/fa";

import { useContext, useState } from "react";

import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import "../styles/Navbar.css";

function NavbarComponent() {
  const { cart = [] } = useContext(CartContext);

  // Wishlist
  const { wishlist = [] } = useWishlist();

  const [search, setSearch] = useState("");

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/";
  };

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(
        search.trim()
      )}`;
    }
  };

  return (
    <Navbar
      expand="lg"
      className="custom-navbar shadow-sm"
      sticky="top"
    >
      <Container>

        {/* ================= LOGO ================= */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="brand"
        >
          Shop<span>Ease</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">

          {/* ================= SEARCH ================= */}
          <Form
            className="search-box mx-auto"
            onSubmit={handleSearch}
          >
            <FormControl
              type="search"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              type="submit"
              variant="primary"
            >
              <FaSearch />
            </Button>
          </Form>

          {/* ================= NAV LINKS ================= */}
          <Nav className="ms-auto align-items-center">

            {/* HOME */}
            <Nav.Link
              as={Link}
              to="/home"
            >
              <FaHome className="me-1" />
              Home
            </Nav.Link>

            {/* PRODUCTS */}
            <Nav.Link
              as={Link}
              to="/products"
            >
              <FaStore className="me-1" />
              Products
            </Nav.Link>

            {/* CONTACT */}
            <Nav.Link
              as={Link}
              to="/contact"
            >
              <FaPhone className="me-1" />
              Contact
            </Nav.Link>

            {/* WISHLIST */}
            <Nav.Link
              as={Link}
              to="/wishlist"
              className="wishlist-link position-relative"
            >
              <FaHeart
                size={20}
                className="text-danger"
              />

              <span className="ms-1">
                Wishlist
              </span>

              {wishlist.length > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="cart-badge"
                >
                  {wishlist.length}
                </Badge>
              )}
            </Nav.Link>

            {/* ================= PROFILE ================= */}
            {!user ? (
              <Nav.Link
                as={Link}
                to="/login"
              >
                <FaUser className="me-1" />
                Login
              </Nav.Link>
            ) : (
              <NavDropdown
                title={
                  <span>
                    <FaUser className="me-1" />
                    Profile
                  </span>
                }
                id="profile-dropdown"
                align="end"
              >

                {/* GREETING */}
                <div className="px-3 py-2 profile-greeting">
                  <strong>
                    Hello {user.name}
                  </strong>
                </div>

                <NavDropdown.Divider />

                {/* MY ORDERS */}
                <NavDropdown.Item
                  as={Link}
                  to="/myorders"
                >
                  <FaBox className="me-2" />
                  My Orders
                </NavDropdown.Item>

                {/* TRACK ORDER */}
                <NavDropdown.Item
                  as={Link}
                  to="/track-order"
                >
                  <FaBox className="me-2" />
                  Track Order
                </NavDropdown.Item>

                <NavDropdown.Divider />

                {/* LOGOUT */}
                <NavDropdown.Item
                  onClick={logout}
                >
                  <FaSignOutAlt className="me-2" />
                  Logout
                </NavDropdown.Item>

              </NavDropdown>
            )}

            {/* ================= CART ================= */}
            <Nav.Link
              as={Link}
              to="/cart"
              className="cart-link position-relative"
            >
              <FaShoppingCart size={20} />

              <span className="ms-1">
                Cart
              </span>

              {cart.length > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="cart-badge"
                >
                  {cart.length}
                </Badge>
              )}
            </Nav.Link>

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;