import { Card } from "react-bootstrap";

function DeliveryInfo() {
  return (
    <Card className="mt-5 shadow">

      <Card.Body>

        <h4>Delivery Information</h4>

        <ul>

          <li>Free Delivery on orders above ₹499</li>

          <li>Cash on Delivery Available</li>

          <li>7 Days Easy Return</li>

          <li>1 Year Warranty (if applicable)</li>

          <li>Secure Payment via Razorpay</li>

        </ul>

      </Card.Body>

    </Card>
  );
}

export default DeliveryInfo;