import { Table } from '@radix-ui/themes';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FeedbackRow({ feedback, onDelete, index }) {
  const [hovered, setHovered] = useState(false);

  const cellVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3, delay: 0.1 * index }
  };

  const userName = feedback.user ? feedback.user.name : 'Anonymous';

  return (
    <Table.Row align="center">
      <Table.Cell>
        <motion.div
          layout
          variants={cellVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {userName}
        </motion.div>
      </Table.Cell>
      <Table.Cell maxWidth='20rem'>
        <motion.div
          layout
          variants={cellVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {feedback.feedback}
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
          {new Date(feedback.createdAt).toLocaleDateString()}
        </motion.div>
      </Table.Cell>
      {/* <Table.Cell justify='center'>
        <motion.div
          layout
          variants={cellVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={() => onDelete(feedback._id)}
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Trash2 size='18' color={hovered ? '#ff6666' : 'black'} />
        </motion.div>
      </Table.Cell> */}
    </Table.Row>
  );
}