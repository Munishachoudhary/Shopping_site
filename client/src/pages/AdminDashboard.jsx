import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import API from "../services/api";
import DashboardCard from "../components/DashboardCard";
import AdminSidebar from "../components/AdminSidebar";
import OrderStatusChart from "../components/OrderStatusChart";
import RevenueChart from "./RevenueChart";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);
const fetchStats = async () => {
  try {
    const { data } = await API.get("/dashboard");

    console.log("Dashboard Response:", data);

    setStats(data);
  } catch (error) {
    console.log(error.response?.data);
    console.log(error.response?.status);
  }
};

  return (
    <div className="d-flex">
      <AdminSidebar />

      <Container fluid className="p-4">

        <h2 className="mb-4">
          Dashboard
        </h2>

        {/* Summary Cards */}
        <Row className="g-3 mb-4">

          <Col md={3}>
            <DashboardCard
              title="Users"
              value={stats.totalUsers}
              color="#0d6efd"
            />
          </Col>

          <Col md={3}>
            <DashboardCard
              title="Products"
              value={stats.totalProducts}
              color="#198754"
            />
          </Col>

          <Col md={3}>
            <DashboardCard
              title="Orders"
              value={stats.totalOrders}
              color="#fd7e14"
            />
          </Col>

          <Col md={3}>
            <DashboardCard
              title="Revenue"
              value={`₹${stats.totalRevenue}`}
              color="#dc3545"
            />
          </Col>

        </Row>

        {/* Charts */}
        <Row className="g-4">

          <Col lg={6}>
            <OrderStatusChart stats={stats.orderStatus} />
          </Col>

          <Col lg={6}>
            <RevenueChart />
          </Col>

        </Row>

      </Container>
    </div>
  );
}

export default AdminDashboard;