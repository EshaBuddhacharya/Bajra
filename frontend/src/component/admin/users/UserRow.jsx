import { Table } from '@radix-ui/themes';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import UserRole from './UserRole';
import { motion } from 'framer-motion';

export default function UserRow({ user, onDelete, currentUser, index }) {
  const [hovered, setHovered] = useState(false);
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
          {user.name}
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
          {user.phone}
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
          {user.address}
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
          <UserRole initialStatus={user.role} user_id={user._id} currentUser={currentUser} />
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
          {new Date(user.createdAt).toLocaleDateString()}
        </motion.div>
      </Table.Cell>
      <Table.Cell justify='center'>
        <motion.div
          layout
          variants={cellVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={() => currentUser._id !== user._id && onDelete(user._id)}
          style={{ cursor: currentUser._id === user._id ? 'not-allowed' : 'pointer' }}
          onMouseEnter={() => { currentUser._id !== user._id && setHovered(true) }}
          onMouseLeave={() => setHovered(false)}
        >
          <Trash2 size='18' color={hovered ? '#ff6666' : 'black'} />
        </motion.div>
      </Table.Cell>
    </Table.Row>
  );
}