import { Select } from '@radix-ui/themes';
import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';

const roleColorMap = {
  admin: 'blue',
  customer: 'green'
};

export default function UserRole({ initialStatus, user_id, currentUser }) {
  const { axiosInstance } = useAuth();
  const [roleValue, setRoleValue] = useState(initialStatus);
  const [roleColor, setRoleColor] = useState(roleColorMap[initialStatus] || 'green');

  const handleChange = async (newRole) => {
    try {
      setRoleValue(newRole);
      setRoleColor(roleColorMap[newRole] || 'green');
      await axiosInstance.put(`/api/users/updateRole/${user_id}`, {
        role: newRole,
      });
    } catch (err) {
      toast.error('Error updating user role', err.message);
    }
  };

  return (
    <Select.Root value={roleValue} color={roleColor} onValueChange={handleChange}>
      <Select.Trigger variant='soft' color={roleColor}>
        {roleValue}
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          {Object.keys(roleColorMap).map((role) => (
            <Select.Item key={role} value={role} disabled={currentUser?._id === user_id}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}