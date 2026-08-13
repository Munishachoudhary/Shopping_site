import { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAdmin = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/users/admin/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-users">
      <AdminSidebar />

      <Container fluid className="admin-users-content">
        <div className="admin-users-header">
          <h2>Manage Users</h2>

          <Form.Control
            type="text"
            className="search-box"
            placeholder="Search User..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="users-table">
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th width="280">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>

                    <td>
                      {user.isAdmin ? (
                        <span className="role-admin">Admin</span>
                      ) : (
                        <span className="role-user">User</span>
                      )}
                    </td>

                    <td>
                      <Button
                        as={Link}
                        to={`/admin/users/${user._id}`}
                        size="sm"
                        className="view-btn"
                      >
                        View
                      </Button>

                      <Button
                        variant="warning"
                        size="sm"
                        className="admin-btn"
                        onClick={() => toggleAdmin(user._id)}
                      >
                        {user.isAdmin ? "Remove Admin" : "Make Admin"}
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        className="delete-btn"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No Users Found
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

export default AdminUsers;