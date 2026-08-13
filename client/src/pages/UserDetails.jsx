import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/UserDetails.css";

function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="user-details">
        <AdminSidebar />

        <Container className="loading-container">
          <Spinner animation="border" />
        </Container>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-details">
        <AdminSidebar />

        <Container className="error-container">
          <Alert variant="danger">
            User not found.
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="user-details">
      <AdminSidebar />

      <Container className="user-details-content">
        <Card className="user-card">

          <Card.Header>
            <h3>User Details</h3>
          </Card.Header>

          <Card.Body>

            <p className="user-info">
              <strong>Name :</strong> {user.name}
            </p>

            <p className="user-info">
              <strong>Email :</strong> {user.email}
            </p>

            <p className="user-info">
              <strong>Role :</strong>{" "}
              {user.isAdmin ? (
                <span className="role-admin">
                  Admin
                </span>
              ) : (
                <span className="role-user">
                  User
                </span>
              )}
            </p>

            <p className="user-info">
              <strong>Account Created :</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>

            <p className="user-info">
              <strong>Total Orders :</strong>{" "}
              {user.totalOrders ?? 0}
            </p>

          </Card.Body>

        </Card>
      </Container>
    </div>
  );
}

export default UserDetails;