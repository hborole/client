import React from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default function TicketDetail({ ticket }) {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) => Router.push(`/orders/${order.id}`),
  });

  const onBuyClick = () => {
    doRequest();
  };

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: ${ticket.price}</h4>
      {errors}
      <button className="btn btn-primary" onClick={onBuyClick}>
        Buy Now
      </button>
    </div>
  );
}

TicketDetail.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);
  return { ticket: data };
};
