import { Table } from '@radix-ui/themes';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import UserRole from './UserRole';

export default function UserRow({ user, onDelete, currentUser }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Table.Row align="center">
      <Table.RowHeaderCell>{user.name}</Table.RowHeaderCell>
      <Table.Cell>{user.phone}</Table.Cell>
      <Table.Cell>{user.address}</Table.Cell>
      <Table.Cell justify='center'>
        <UserRole initialStatus={user.role} user_id={user._id} currentUser={currentUser}/>
      </Table.Cell>
      <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
      <Table.Cell justify='center'>
        <div
          onClick={() => onDelete(user._id)}
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Trash2 size='18' color={hovered ? '#ff6666' : 'black'} />
        </div>
      </Table.Cell>
    </Table.Row>
  );
}