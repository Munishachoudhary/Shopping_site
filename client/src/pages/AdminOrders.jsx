import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Form,
  Button,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.user?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      order._id
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Processing":
        return "primary";
      case "Shipped":
        return "info";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="admin-orders">

      <AdminSidebar />

      <Container fluid className="admin-orders-content">

        <div className="admin-orders-header">

          <h2>Manage Orders</h2>

          <Form.Control
            className="search-box"
            type="text"
            placeholder="Search by Customer or Order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <Form.Select
          className="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </Form.Select>

        <div className="orders-table">

          <Table hover responsive>

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th width="220">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id}>

                    <td>#{order._id.slice(-6)}</td>

                    <td>{order.user?.name}</td>

                    <td>₹{order.totalPrice}</td>

                    <td>
                      <Badge bg={getStatusVariant(order.orderStatus)}>
                        {order.orderStatus}
                      </Badge>
                    </td>

                    <td>

                      <Button
                        as={Link}
                        to={`/admin/orders/${order._id}`}
                        className="view-btn"
                        size="sm"
                      >
                        View
                      </Button>

                      <Form.Select
                        size="sm"
                        className="status-select mt-2"
                        value={order.orderStatus}
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </Form.Select>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <h5>No Orders Found</h5>
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

export default AdminOrders;