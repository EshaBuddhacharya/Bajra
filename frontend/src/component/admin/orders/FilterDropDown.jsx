import { DropdownMenu, Button } from '@radix-ui/themes';
import { ListFilter } from 'lucide-react';

export default function FilterDropdown({selectedStatus, setSelectedStatus}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant='soft'>
          <ListFilter size='16' />
          <div style={{ marginRight: '1rem' }}>Order Status</div>
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content >
        <DropdownMenu.Item>pending</DropdownMenu.Item>
        <DropdownMenu.Item>inprogress</DropdownMenu.Item>
        <DropdownMenu.Item>in delivery</DropdownMenu.Item>
        <DropdownMenu.Item>completed</DropdownMenu.Item>
        <DropdownMenu.Item>canceled</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}