import { Table } from '@radix-ui/themes';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import OrderStatusSelect from './OrderStatusSelect';

export default function OrderRow({ order, onDelete }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Table.Row>
      <Table.RowHeaderCell>{order.user.name}</Table.RowHeaderCell>
      <Table.Cell>{order.user.phone}</Table.Cell>
      <Table.Cell>{order.deliveryLocation}</Table.Cell>
      <Table.Cell justify='center'>
        <OrderStatusSelect initialStatus={order.orderStatus} orderId={order._id} />
      </Table.Cell>
      <Table.Cell>{new Date(order.createdAt).toLocaleDateString()}</Table.Cell>
      <Table.Cell>{order.items?.length || 0}</Table.Cell>
      <Table.Cell justify='center'>
        <div
          onClick={() => onDelete(order._id)}
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Trash2 size='18' color={hovered ? '#ff6666' : 'black'} />
        </div>
      </Table.Cell>
    </Table.Row>
  );
}