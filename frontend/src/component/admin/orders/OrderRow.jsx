import { Table, DropdownMenu, Button, Flex } from '@radix-ui/themes';
import { Trash2, Info } from 'lucide-react';
import { useState } from 'react';
import OrderStatusSelect from './OrderStatusSelect';
import { motion } from 'framer-motion';

export default function OrderRow({ order, onDelete, index, setDetailsDialogOpen, setSelectedOrderDetails }) {
  const [hovered, setHovered] = useState(false);

  const handleDetailsClick = () => { 
    setSelectedOrderDetails(order);
    setDetailsDialogOpen(true)
  }
  
  const cellVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3, delay: 0.1 * index }
  };

  return (
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
      <Table.Cell>
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
      <Table.Cell>
        <motion.div
          layout
          variants={cellVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {order.deliveryLocation}
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
          <OrderStatusSelect initialStatus={order.orderStatus} orderId={order._id} />
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
          {new Date(order.createdAt).toLocaleDateString()}
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
          {order.items?.length || 0}
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
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant='soft'>
                Actions
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>
                <Flex px="12px" gap='2' align={'center'} onClick={handleDetailsClick}>
                  <Info size='16' />
                  Details
                </Flex>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <Flex px="12px" gap='2' align={'center'} onClick={() => onDelete(order._id)}>
                  <Trash2 size='16' />
                  Delete
                </Flex>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </motion.div>
      </Table.Cell>
    </Table.Row>
  );
}