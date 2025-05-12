import { Table, Skeleton } from '@radix-ui/themes';
import TableHeader from './TableHeader';
import UserRow from './UserRow';

export default function UsersTable({ users, onDelete, isLoading, toggleOrder, setSortBy, isAscending, sortBy, currentUser }) {
  return (
    isLoading ? (
      <UserSkeleton />
    ) : (
      <Table.Root size="2" variant="surface"> 
        <TableHeader toggleOrder={toggleOrder} setSortBy={setSortBy}/>  
        <Table.Body>
          {users.map((user) => (
          <UserRow key={user._id} user={user} onDelete={onDelete} isAscending={isAscending} sortBy={sortBy} currentUser={currentUser}/>
          ))}
        </Table.Body>
      </Table.Root>
    )
  );
}

const UserSkeleton = () => {
  return (
    <Table.Root size="2" variant="surface">
      <TableHeader />
      <Table.Body>
        {[...Array(5)].map((_, i) => (
          <Table.Row key={i}>
            {[...Array(6)].map((_, j) => (
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
