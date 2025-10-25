import OrderDetailsClient from './OrderDetailsClient';

interface Props {
  params: {
    orderId: string;
  };
}

export default function OrderDetailsPage({ params }: Props) {
  return <OrderDetailsClient orderId={params.orderId} />;
}

// If needed, keep static params like this
export async function generateStaticParams() {
  const orders = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];

  return orders.map(order => ({
    orderId: order.id,
  }));
}
