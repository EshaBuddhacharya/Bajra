import { Table, Skeleton } from '@radix-ui/themes';
import TableHeader from './TableHeader';
import OrderRow from './OrderRow';

export default function OrdersTable({ orders, onDelete, isLoading }) {
  return (
    isLoading ? (
      <OrderSkeleton />
    ) : (
      <Table.Root size="2" variant="surface"> 
        <TableHeader />
        <Table.Body>
          {orders.map((order) => (
            <OrderRow key={order._id} order={order} onDelete={onDelete} />
          ))}
        </Table.Body>
      </Table.Root>
    )
  );
}

const OrderSkeleton = () => {
  return (
    <Table.Root size="2" variant="surface">
      <TableHeader />
      <Table.Body>
        {[...Array(7)].map((_, i) => (
          <Table.Row key={i}>
            {[...Array(7)].map((_, j) => (
              <Table.Cell key={j}>
                <Skeleton />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
