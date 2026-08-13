import { Card } from "react-bootstrap";

function DashboardCard({
  title,
  value,
  color,
}) {
  return (
    <Card
      className="text-center shadow"
      style={{
        background: color,
        color: "#fff",
      }}
    >
      <Card.Body>
        <h5>{title}</h5>

        <h2>{value}</h2>
      </Card.Body>
    </Card>
  );
}

export default DashboardCard;