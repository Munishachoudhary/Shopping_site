import { useEffect, useState } from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';
import API from '../services/api';
import "../styles/Myorders.css"

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get('/orders/myorders');
        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className='orders-spinner'>
        <Spinner animation='border' variant='primary' />
      </div>
    );
  }

  return (
    <div className='my-orders-page'>
      <Container>
        <h2 className='orders-title'>My Orders</h2>

        {orders.length === 0 ? (
          <div className='empty-orders'>
            <h4>No Orders Found</h4>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          orders.map((order) => (
            <Card key={order._id} className='order-card'>
              <div className='order-header'>
                <h5>Order ID: {order._id}</h5>
              </div>

              <div className='order-body'>
                <div className='order-info'>
                  <span className='order-label'>Total Amount</span>
                  <span className='order-total'>₹{order.totalPrice}</span>
                </div>

                <div className='order-info'>
                  <span className='order-label'>Payment</span>
                  <span className='order-value'>{order.paymentMethod}</span>
                </div>

                <div className='order-info'>
                  <span className='order-label'>Status</span>
                  <span className='status-badge status-pending'>
                    {order.status || 'Pending'}
                  </span>
                </div>

                <div className='order-info'>
                  <span className='order-label'>Order Date</span>
                  <span className='order-value'>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
}

export default MyOrders;