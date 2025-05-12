import { Table } from '@radix-ui/themes';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import OrderStatusSelect from './OrderStatusSelect';
import { motion } from 'framer-motion';

export default function OrderRow({ order, onDelete }) {
  const [hovered, setHovered] = useState(false);

  const cellVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.3 }
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
          onClick={() => onDelete(order._id)}
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Trash2 size='18' color={hovered ? '#ff6666' : 'black'} />
        </motion.div>
      </Table.Cell>
    </Table.Row>
  );
}