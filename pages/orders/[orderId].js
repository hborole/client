import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';

export default function OrderDetail({ order, currentUser }) {
  const [timeLeft, setTimeLeft] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => console.log(payment),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, [order]);

  if (timeLeft < 0) {
    return (
      <>
        <div>Order Expired</div>
        <br />
        <Link href={'/'}>
          <a>Home</a>
        </Link>
      </>
    );
  }

  return (
    <div>
      <div>Time left to pay: {timeLeft}s</div>

      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey={`pk_test_51LaGzYLUCuKOBkeUGsycMDFLEbhpBr9uAdgLBa8YCRDpLHj2Co89kkDxo70lEYdXG0dOGoUHlrIenzZPqMwufsBT007jYy935z`}
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />

      {errors}
    </div>
  );
}

OrderDetail.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};
