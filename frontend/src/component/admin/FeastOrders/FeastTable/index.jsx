import { Table, Skeleton, Text, Flex } from '@radix-ui/themes';
import TableHeader from './TableHeader';
import FeastRow from './FeastRow';

export default function FeastTable({ orders, onDelete, isLoading, toggleOrder, setSortBy, isAscending, sortBy, isDetailsDialogOpen, setIsDetailsDialogOpen, selectedOrder, setSelectedOrder }) {
  return (
    isLoading ? (
      <OrderSkeleton />
    ) : (
      <Table.Root size="1" variant="surface">
        <TableHeader toggleOrder={toggleOrder} setSortBy={setSortBy} />
        <Table.Body>
          {orders.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={7} align='center'>
                <Flex justify="center">
                  <Text size="5" justify="center" weight="bold">No orders available</Text>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ) : (
            orders.map((order, index) => (
              <FeastRow 
                key={order._id} 
                order={order} 
                onDelete={onDelete} 
                index={index} 
                setIsDetailsDialogOpen={setIsDetailsDialogOpen}
                setSelectedOrder={setSelectedOrder}
              />
            ))
          )}
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
            {[...Array(9)].map((_, j) => (
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
