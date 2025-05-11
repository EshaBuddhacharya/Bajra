import { Select } from '@radix-ui/themes';
import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';

const statusColorMap = {
  pending: 'orange',
  inprogress: 'blue',
  'in delivery': 'purple',
  completed: 'green',
  canceled: 'red',
};

export default function OrderStatusSelect({ initialStatus, orderId }) {
  const { axiosInstance } = useAuth();
  const [statusValue, setStatusValue] = useState(initialStatus);
  const [statusColor, setStatusColor] = useState(statusColorMap[initialStatus] || 'blue');

  const handleChange = async (newStatus) => {
    try {
      setStatusValue(newStatus);
      setStatusColor(statusColorMap[newStatus] || 'blue');
      await axiosInstance.put('/api/order/updateOrderStatus', {
        order_id: orderId,
        status: newStatus,
      });
    } catch (err) {
      toast.error('Error updating order status', err.message);
    }
  };

  return (
    <Select.Root value={statusValue} color={statusColor} onValueChange={handleChange}>
      <Select.Trigger variant='soft' color={statusColor}>
        {statusValue}
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          {Object.keys(statusColorMap).map((stat) => (
            <Select.Item key={stat} value={stat}>
              {stat.charAt(0).toUpperCase() + stat.slice(1)}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}