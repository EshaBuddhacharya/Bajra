import { Table } from '@radix-ui/themes';
import { Trash2, Info } from 'lucide-react';
import { useState } from 'react';
import OrderStatusSelect from './OrderStatusSelect';
import { motion } from 'framer-motion'; // eslint-disable-line
import { DropdownMenu, Button } from '@radix-ui/themes';
import OrderDetailsDialog from '../../Dialogs/DetailsDialog';

export default function FeastRow({ order, onDelete, index, setIsDetailsDialogOpen, setSelectedOrder }) {
  const [hovered, setHovered] = useState(false);

  const cellVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3, delay: 0.1 * index }
  };

  const totalItems = (order.compulsoryItems?.length || 0) +
    (order.additionalItems?.length || 0) +
    (order.desserts?.length || 0);

  return (
    <>
      <Table.Row align="center">
        <Table.RowHeaderCell>
          <motion.div
            layout
            variants={cellVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {order.user.name}
          </motion.div>
        </Table.RowHeaderCell>
        <Table.Cell justify='center'>
          <motion.div
            layout
            variants={cellVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {order.peopleCount}
          </motion.div>
        </Table.Cell>
        <Table.Cell justify='center'>
          <motion.div
            layout
            variants={cellVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {order.user.phone}
          </motion.div>
        </Table.Cell>
        <Table.Cell justify='center'>
          <motion.div
            layout
            variants={cellVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {order.totalPrice}
          </motion.div>
        </Table.Cell>
        <Table.Cell>
          <motion.div
            layout
            variants={cellVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {order.user.address}
          </motion.div>
        </Table.Cell>
        <Table.Cell justify='center'>
          <motion.div
            layout
            variants={cellVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <OrderStatusSelect initialStatus={order.status} orderId={order._id} />
          </motion.div>
        </Table.Cell>
        <Table.Cell justify='center'>
          <motion.div
            layout
            variants={cellVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {new Date(order.orderDate).toLocaleDateString()}
          </motion.div>
        </Table.Cell>
        <Table.Cell justify='center'>
          <motion.div
            layout
            variants={cellVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {totalItems}
          </motion.div>
        </Table.Cell>
        <Table.Cell justify='center'>

          <motion.div
            layout
            variants={cellVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ cursor: 'pointer' }}
          >
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Button variant='soft'>
                  Actions
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content sideOffset={5} onMouseHover={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                <DropdownMenu.Item onSelect={() => onDelete(order._id)}>
                  <Trash2 size='16' />
                  Delete Order
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => {setSelectedOrder(order); setIsDetailsDialogOpen(true)}}>
                  <Info size='16' />
                  Details
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </motion.div>
        </Table.Cell>
      </Table.Row>
    </>
  );
}