import { Table, Skeleton, Text, Flex } from '@radix-ui/themes';
import FeedbackRow from './FeedbackRow';

export default function FeedbacksTable({ feedbacks, onDelete, isLoading }) {
  return (
    isLoading ? (
      <FeedbackSkeleton />
    ) : (
      <Table.Root size="2" variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Feedback</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            {/* <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell> */}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {feedbacks.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={4} align='center'>
                <Flex justify="center">
                  <Text size="5" justify="center" weight="bold">No feedbacks available</Text>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ) : (
            feedbacks.map((feedback, index) => (
              <FeedbackRow 
                key={feedback._id} 
                feedback={feedback} 
                onDelete={onDelete} 
                index={index} 
              />
            ))
          )}
        </Table.Body>
      </Table.Root>
    )
  );
}

const FeedbackSkeleton = () => {
  return (
    <Table.Root size="2" variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Feedback</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {[...Array(5)].map((_, i) => (
          <Table.Row key={i}>
            <Table.Cell><Skeleton /></Table.Cell>
            <Table.Cell><Skeleton /></Table.Cell>
            <Table.Cell><Skeleton /></Table.Cell>
            <Table.Cell><Skeleton /></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};