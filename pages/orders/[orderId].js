import React, { useEffect, useState } from 'react';

export default function OrderDetail({ order }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, [order]);

  return (
    <div>
      <div>Time left to pay: {timeLeft}s</div>

      <button className="btn btn-primary">Pay</button>
    </div>
  );
}

OrderDetail.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};
