import { Table } from '@radix-ui/themes';
import TableHeader from './TableHeader';
import OrderRow from './OrderRow';

export default function OrdersTable({ orders, onDelete }) {
  return (
    <Table.Root size="2" variant="surface">
      <TableHeader />
      <Table.Body>
        {orders.map((order) => (
          <OrderRow key={order._id} order={order} onDelete={onDelete} />
        ))}
      </Table.Body>
    </Table.Root>
  );
}